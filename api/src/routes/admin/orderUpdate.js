const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const { User, Payment, Direction, Order } = require("../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

router.get("/order-update/:orderId", async (req, res) => {
  try {
    const {
      params: { orderId },
      query: { state },
    } = req;
    const validStates = [
      "CARRITO",
      "CONFIRMADO",
      "DESPACHADO",
      "CANCELADO",
      "ENTREGADO",
    ];
    if (validStates.includes(state) && typeof orderId === "number") {
      const order = await Order.update({ state: state }, orderId);
      if (order[0] === 1) {
        res.json(responseMessage(SUCCESS, "Estado actualizado correctamente"));
      } else {
        res.json(
          responseMessage(ERROR, "Ocurrio un error al actualizar el estado")
        );
      }
    } else {
      res.json(
        responseMessage(ERROR, "Alguno de los parametros es incorrecto")
      );
    }
  } catch (err) {
    const { message } = err;
    res.json(responseMessage(ERROR, message));
  }
});

router.post("/order-update/:userId", async (req, res) => {
  try {
    const {
      params: { userId },
      body: {
        data: { payment, direction },
      },
    } = req;
    if (
      (payment === "MercadoPago" || payment === "Efectivo") &&
      direction.length > 0 &&
      validate(userId)
    ) {
      let userOrder = await User.findAll({
        where: { id: userId },
        include: {
          model: Order,
          where: {
            status: "CARRITO",
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
