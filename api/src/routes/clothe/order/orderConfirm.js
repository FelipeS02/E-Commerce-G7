const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const { User, Payment, Direction, Order } = require("../../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../../controller/responseMessages");

router.post("/order-confirm/:userId/:orderId", async (req, res) => {
  try {
    const {
      params: { userId, orderId },
      body: {
        data: { payment, direction },
      },
    } = req;
    if (
      (payment === "MercadoPago" || payment === "Efectivo") &&
      direction.length > 0 &&
      validate(userId) && validate(orderId)
    ) {
      let userOrder = await User.findAll({
        where: { id: userId },
        include: {
          model: Order,
          where: {
            id: orderId,
          },
        },
      });
      if (userOrder.length > 0) {
        const [currentOrder, newPayment, newDirection] = await Promise.all([
          await Order.findByPk(userOrder[0].orders[0].id),
          await Payment.create({ payment: payment }),
          await Direction.create({ data: direction }),
        ]);

        await Promise.all([
          await currentOrder.addPayment(newPayment),
          await currentOrder.addDirection(newDirection),
          await currentOrder.update({ state: "CONFIRMADA" }),
        ]);

        res.json(responseMessage(SUCCESS, currentOrder));
      } else {
        res.json(responseMessage(ERROR, "El usuario no tiene asignada esa orden"))
      }
    } else {
      res.json(
        responseMessage(
          ERROR,
          "El metodo de pago es incorrecto o el usuario no es valido"
        )
      );
    }
  } catch (err) {
    const { message } = err;
    res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
