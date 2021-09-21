const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const { Clothe, Order, User } = require("../../../db");
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
      const [findUserOrder, currentClothe] = await Promise.all([
        await Order.findOne({
          where: {
            state: "CARRITO",
            userId,
          },
        }),
        await Clothe.findByPk(clotheId),
      ]);

      const price = currentClothe.price * quantity;

      if (!findUserOrder) {
        const [newOrder, currentUser] = await Promise.all([
          await Order.create({ total: price, userId }),
          await User.findByPk(userId),
        ]);

        await Promise.all([
          await newOrder.addClothe(clotheId, {
            through: { quantity, size },
          }),
          await currentUser.addOrder(newOrder.id),
        ]);
      
      } else {
        
        await Promise.all([
          await findUserOrder.increment(["total"], { by: price }),
          await findUserOrder.addClothe(clotheId, {
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
