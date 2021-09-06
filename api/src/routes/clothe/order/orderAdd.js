const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const { Clothe, User, Order, Size } = require("../../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../../controller/responseMessages");
const { where } = require("sequelize/types");

router.post("/order-add/:userId", async (req, res) => {
  try {
    const {
      body: {
        data: {
          clothe: { size, quantity, clotheId },
        },
      },
      params: { userId },
    } = req;

    if (clothe && userId && validate(userId) && typeof clothe === "object") {
      const [currentClothe, userOrder] = await Promise.all([
        await Clothe.findByPk(clotheId),
        await User.findAll({
          where: { id: userId },
          include: {
            model: Order,
            where: {
              status: "CARRITO",
            },
          },
        }),
      ]);
      //Decremento el stock por la cantidad
      const sizeOfClothe = await Size.findOne({
        where: {
          size: size,
        },
        include: {
          model: Clothe,
          where: {
            id: clotheId
          }
        }
      });
      //Calculo el precio por las unidades
      const price = currentClothe.price * quantity;
      await sizeOfClothe.decrement(['stock'], {By: quantity})
      if (userOrder.length === 0) {
        //? Si no la encuentra devuelve []
        const [user, newOrder] = await Promise.all([
          await User.findByPk(userId),
          //Creo la orden con valor inicial del producto que me llego por id.
          await Order.create({
            total: price,
          }),
        ]);

        await Promise.all([
          //Reduzco el stock por la cantidad
          await newOrder.addClothe(currentClothe, { quantity: quantity }),
          await user.addOrder(newOrder),
        ]);

        return res.json(responseMessage(SUCCESS, user));
      } else {
        //? Si existe la orden la busco por el id que me trae la relacion
        const currentOrder = await Order.findByPk(userOrder[0].orders[0].id);

        await Promise.all([
          await currentOrder.increment(["total"], { by: price }),
          await currentOrder.addClothe(currentClothe, { quantity: quantity }),
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
