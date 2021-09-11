const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const { Clothe, User, Order } = require("../../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../../controller/responseMessages");

router.put("/", async (req, res) => {
  try {
    const {
      body: {
        data: { size, quantity, clotheId, userId },
      },
    } = req;

    if (userId && validate(userId)) {
      const [userFindOrder, currentClothe] = await Promise.all([
        await User.findOne({
          where: { id: userId },
          include: {
            model: Order,
            where: {
              state: "CARRITO",
            },
          },
        }),
        await Clothe.findByPk(clotheId),
      ]);

      const price = currentClothe.price * quantity;
      
      if (!userFindOrder) {
        const currentUser = await User.findByPk(userId);
        const newOrder = await Order.create({ total: price, userId });
        await Promise.all([
          await newOrder.addClothe(clotheId, {
            through: { quantity, size },
          }),
          await currentUser.addOrder(newOrder.id),
        ]);
      } else {
        const currentOrder = await Order.findByPk(
          userFindOrder.orders[0].dataValues.id
        );
        await Promise.all([
          await currentOrder.increment(["total"], { by: price }),
          await currentOrder.addClothe(clotheId, {
            through: { quantity, size },
          }),
        ]);
      }
      return res.json(
        responseMessage(SUCCESS, "Prenda agregada correctamente")
      );
    } else {
      return res
        .status(400)
        .json(
          responseMessage(ERROR, "Uno de los datos enviados es incorrecto")
        );
    }
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
