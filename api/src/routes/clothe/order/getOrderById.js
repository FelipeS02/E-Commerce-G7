const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const { Order, Clothe, Media } = require("../../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../../controller/responseMessages");

router.get("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    if (validate(orderId)) {
      const response = await Order.findOne({
        where: { id: orderId },
        attributes: ["id", "direction", "payment", "total", "userId", "state"],
        include: {
          model: Clothe,
          attributes: ["id", "name", "price", "color", "genre", "detail"],
          include: {
            model: Media,
            attributes: ["name"],
            through: { attributes: [] },
          },
          through: {
            as: "quantity_and_size",
            attributes: ["quantity", "size"],
          },
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
