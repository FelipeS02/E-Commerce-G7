const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const { Order, Order_clothes, Clothe } = require("../../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../../controller/responseMessages");

router.get("/order-detail/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    if (validate(orderId)) {
      const response = await Order.findOne({
        where: { id: orderId },
        include: {
          model: Order_clothes,
          atributes: ["quantity", "size"],
          include: { model: Clothe, through: { attributes: [] } },
        },
      });
      if (response) {
        return res.json(responseMessage(SUCCESS, response));
      } else {
        return res.json(responseMessage(ERROR, "Esa orden es inexistente"));
      }
    } else {
      return res.json(
        responseMessage(
          ERROR,
          "El id debe ser un numero y no puede estar vacio"
        )
      );
    }
  } catch (err) {
    const { message } = err;
    res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
