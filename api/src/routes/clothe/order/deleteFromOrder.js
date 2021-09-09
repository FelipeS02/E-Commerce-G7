const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const { Order_clothes, Order, Clothe } = require("../../../db");
const { Op } = require("sequelize");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../../controller/responseMessages");

router.delete("/:orderId/:clotheId", async (req, res) => {
  try {
    const { orderId, clotheId, size } = req.params;
    if (validate(orderId) && typeof clotheId === "number") {
      //? En la tabla relacional, busco una seccion donde se encuentran relacionados la orden y el producto
      const orderClothe = await Order_clothes.findOne({
        where: {
          [Op.and]: [{ orderId: orderId }, { clotheId: clotheId }, {size: size}],
        },
      });

      if (!orderClothe) {
        return res.json(
          responseMessage(ERROR, "La orden no incluye este producto")
        );
      } else {
        //Si existe
        const [currentClothe, currentOrder, sizeOfClothe] = await Promise.all([
          await Clothe.findByPk(clotheId),
          await Order.findByPk(orderId),
          await Size.findOne({
            where: {
              size: size,
            },
            include: {
              model: Clothe,
              where: {
                id: clotheId,
              },
            },
          }),
        ]);

        const price = currentClothe.price * orderClothe.quantity;

        //Incremento el stock de la prenda y decremento el valor total de la orden
        await Promise.all([
          await currentOrder.decrement(["total"], { by: price }),
          await sizeOfClothe.increment(["stock"], { by: orderClothe.quantity})
        ]);

        //Y destruyo la relacion, por lo tanto ya no figura dentro de la orden
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
