const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const {
  User,
  Payment,
  Direction,
  Order,
  Size,
  Clothe,
} = require("../../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../../controller/responseMessages");

const clotheUpdate = async (clothesArray) => {
  const process = clothesArray.map(async (e) => {
    const { quantity, size, clotheId } = e;
    const currentClotheSize = await Size.findOne({
      where: { size: size },
      include: {
        model: Clothe,
        where: {
          id: clotheId,
        },
      },
    });
    await currentClotheSize.decrement(["stock"], { by: quantity });
  });
  await Promise.all(process);
};

router.post("/", async (req, res) => {
  try {
    const {
      body: {
        data: { orderId, payment, direction, clothes, userId },
      },
    } = req;

    const validPayment = ["Efectivo", "MercadoPago"];

    if (
      direction.length !== "" &&
      validate(userId) &&
      validate(orderId) &&
      clothes.length > 0
    ) {
      const [currentOrder, newPayment, newDirection] = await Promise.all([
        await Order.findOne({
          where: { state: "CARRITO" },
          include: {
            model: User,
            where: { id: userId },
          },
        }),
        await Payment.create({ payment: payment }),
        await Direction.create({ data: direction }),
      ]);

      await Promise.all([
        await currentOrder.addPayment(newPayment),
        await currentOrder.addDirection(newDirection),
        await clotheUpdate(clothes),
        await currentOrder.update({ state: "CONFIRMADA" }),
      ]);
      res.json(responseMessage(SUCCESS, currentOrder));
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
