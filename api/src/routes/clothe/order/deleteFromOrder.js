const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const { Order_clothes, Order, Clothe, Size } = require("../../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../../controller/responseMessages");

router.put("/", async (req, res) => {
  try {
    const {
      body: {
        data: { orderId, size, clotheId },
      },
    } = req;

    const validSizes = ["XS", "S", "M", "L", "XL", "XXL"];

    if (
      validate(orderId) &&
      typeof clotheId === "number" &&
      validSizes.includes(size)
    ) {
      //? En la tabla relacional, busco una seccion donde se encuentran relacionados la orden y el producto
      const orderClothe = await Order_clothes.findOne({
        where: {
          clotheId,
          size,
          orderId,
        },
      });

      if (!orderClothe) {
        return res.json(
          responseMessage(ERROR, "La orden no incluye este producto")
        );
      } else {
        const [currentClothe, currentOrder] = await Promise.all([
          await Clothe.findOne({
            where: { id: clotheId },
            include: {
              model: Size,
              where: { size },
            },
          }),
          await Order.findByPk(orderId),
        ]);

        const sizeOfClothe = await Size.findByPk(
          currentClothe.sizes[0].dataValues.id
        );

        const price = currentClothe.price * orderClothe.quantity;

        await Promise.all([
          await currentOrder.decrement(["total"], { by: price }),
          await sizeOfClothe.increment(["stock"], { by: orderClothe.quantity }),
          await orderClothe.destroy(),
        ]);

        return res.json(
          responseMessage(
            SUCCESS,
            `Producto #${clotheId} eliminado de la orden #${orderId}`
          )
        );
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
