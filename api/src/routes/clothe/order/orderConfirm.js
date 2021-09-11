const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const { User, Direction, Order, Size, Clothe } = require("../../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../../controller/responseMessages");

const clotheUpdate = async (clothesArray) => {
  const process = clothesArray.map(async (e) => {
    const { quantity, size, clotheId } = e;
    const currentClotheSize = await Size.findOne({
      where: { size, clotheId },
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

    const validPayment = ["Efectivo / Transferencia", "MercadoPago"];

    if (
      direction.length !== "" &&
      validate(userId) &&
      validate(orderId) &&
      clothes.length > 0 &&
      validPayment.includes(payment)
    ) {
      const [currentUser, currentOrder, [currentDirection, isCreated]] = await Promise.all(
        [
          await User.findOne({
            where: { id: userId },
            include: [
              {
                model: Order,
                where: { id: orderId },
              },
            ],
          }),
          await Order.findOne({
            where: {id: orderId, userId}
          }),
          await Direction.findOrCreate({
            where: {
              data: direction,
            },
          }),
        ]
      );

      const userhasDirection = await currentUser.hasDirection(
        currentDirection
      );

      if (!userhasDirection) {
        currentUser.addDirection(currentDirection)
      }

      await Promise.all([
        await currentOrder.update({
          payment: payment,
          direction: direction,
          state: "CONFIRMADO",
        }),
        await clotheUpdate(clothes),
      ]);

      res.json(responseMessage(SUCCESS, "Orden confirmada correctamente"));
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
