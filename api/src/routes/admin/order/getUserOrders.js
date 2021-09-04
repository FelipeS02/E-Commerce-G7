const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const { User, Order } = require("../../../db");

router.get("/user-orders", async (req, res) => {
  const { userId, orderStatus } = req.query;
  let response;
  const validStatus = [
    "CARRITO",
    "CONFIRMADO",
    "DESPACHADO",
    "CANCELADO",
    "ENTREGADO",
    ""
  ];
  try {
    if (validStatus.includes(orderStatus)) {
      if (validate(userId)) {
        response = await User.findAll({
          where: {
            id: userId,
          },
          include: {
            model: Order,
            where: {
              status: { [Op.iLike]: `%${orderStatus}%` },
            },
          },
        });
      }
      else if (userId === "") {
        response = await User.findAll({
          include: {
            model: Order,
            where: {
              name: { [Op.iLike]: `%${orderStatus}%` },
            },
          },
        });
      } else {
        return res.status(400).json({Error: "El query 'userId' debe ser un UUID valido o un string vacio"})
      }
      if (response.length > 0) {
        return res.status(200).json({ data: response });
      } else {
        return res.status(404).json({
          NotFound: "No existe ninguna orden con ese estado dentro del usuario",
        });
      }
    } else {
      return res
        .status(400)
        .json({
          Error:
            "El status debe ser de tipo CARRITO, CONFIRMADO, DESPACHADO, CANCELADO, ENTREGADO o debe ser un string vacio",
        });
    }
  } catch (err) {
    const { message } = err;
    return res.status(400).json({ message });
  }
});

module.exports = router;
