const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const { User, Payment, Direction, Order } = require("../../db");

router.post("/order-confirm/:userId", async (req, res) => {
  const { userId } = req.params;
  const { payment, direction } = req.body.data;
  if (
    (payment === "MercadoPago" || payment === "Efectivo") &&
    direction.length > 0 &&
    validate(userId)
  ) {
    try {
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
        const currentOrder = await Order.findByPk(userOrder[0].orders[0].id);
        const newPayment = await Payment.create({ payment: payment });
        const newDirection = await Direction.create({ data: direction });
        await currentOrder.addPayment(newPayment);
        await currentOrder.addDirection(newDirection);
        await currentOrder.update({ state: "CONFIRMADA" });
        res.status(200).json({
          Success: "Orden confirmada vuelva prontos",
          data: currentOrder,
        });
      }
    } catch (err) {
      const { message } = err;
      res.status(400).json({ message });
    }
  } else {
    res.status(400).json({
      Error:
        "Alguno de los metodos de pago es incorrecto (payment === 'Efectivo' || payment === 'MercadoPago') o userId no es de tipo uuid",
    });
  }
});
module.exports = router;
