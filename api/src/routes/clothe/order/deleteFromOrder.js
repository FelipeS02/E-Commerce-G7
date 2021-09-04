const { Router } = require("express");
const router = Router();
const { Order_clothes, Order, Clothe } = require("../../../db");
const { Op } = require("sequelize");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../../controller/responseMessages");

router.delete("/order-delete/:orderId/:clotheId", async (req, res) => {
  try {
    const { orderId, clotheId } = req.params;
    if (
      orderId &&
      typeof orderId === "number" &&
      clotheId &&
      typeof clotheId === "number"
    ) {
      const orderClothe = await Order_clothes.findOne({
        where: {
          [Op.and]: [{ orderId: orderId }, { clotheId: clotheId }],
        },
      });
      if (!orderClothe) {
        return res.json(
          responseMessage(ERROR, "La orden no incluye este producto")
        );
      } else {
        await Clothe.increment(["stock"], { by: orderClothe.quantity });
        const result = await orderClothe.destroy();
        if (result === 1) {
          return res.json(
            responseMessage(
              SUCCESS,
              `Producto #${clotheId} eliminado de la orden #${orderId}`
            )
          );
        } else {
          return res.json(
            responseMessage(
              ERROR,
              "El producto no pudo ser eliminado de la orden"
            )
          );
        }
      }
    } else {
      return res.json(
        responseMessage(
          ERROR,
          "La id de orden y la id de prenda deben ser numeros y no deben estar vacios"
        )
      );
    }
  } catch (err) {
    const { message } = err;
    res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
