const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const { Order_clothes, Clothe, User, Order } = require("../../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../../controller/responseMessages");

router.post("/order-add/:userId", async (req, res) => {
  try {
    const {
      body: {
        data: { clothe: { quantity, clotheId, price } = {} },
      },
      params: { userId },
    } = req;

    if (clothe && userId && validate(userId) && typeof clothe === "object") {
      const userOrder = await User.findAll({
        where: { id: userId },
        include: {
          model: Order,
          where: {
            status: "CARRITO",
          },
        },
      });

      if (userOrder.length === 0) {
        const [user, newOrder, currentClothe] = await Promise.all([
          await User.findByPk(userId),
          await Order.create({
            total: price,
          }),
          await Clothe.findByPk(clotheId),
        ]);

        await Promise.all([
          await currentClothe.decrement(["stock"], { by: quantity }),
          await newOrder.addClothe(currentClothe, { quantity: quantity }),
          await user.addOrder(newOrder),
        ]);

        return res.json(responseMessage(SUCCESS, user));
      } else {
        const currentOrder = Order.findByPk(userOrder[0].orders[0].id);

        await Promise.all([
          await currentOrder.increment(["total"], { by: price }),
          await clotheRelation(clothes, currentOrder),
        ]);

        return res.json(responseMessage(SUCCESS, currentOrder));
      }
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
