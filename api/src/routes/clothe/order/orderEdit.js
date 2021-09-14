const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const { Order, Order_clothes, Clothe } = require("../../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../../controller/responseMessages");

const orderModify = async (idOrder, clothesArray) => {
  const order = await Order.findByPk(idOrder);
  // Busco la orden por id
  const process = clothesArray.map(async (e) => {
    const { clotheId, quantity, size } = e;
    const [currentQuantity, currentClothe] = await Promise.all([
      await Order_clothes.findOne({
        where: {
          clotheId,
          size,
          orderId: idOrder,
        },
      }),
      // Busco la relacion entre clothe y order donde almaceno el size y quantity
      await Clothe.findByPk(clotheId),
      // Busco la prenda para extraer su precio
    ]);

    const oldPrice = currentClothe.price * currentQuantity.quantity;
    const newPrice = currentClothe.price * quantity;

    await Promise.all([
      await order.decrement(["total"], { by: oldPrice }),
      //Elimino el precio anterior
      await order.increment(["total"], { by: newPrice }),
      //Sumo el precio actualizado
      await currentQuantity.update({ quantity }),
      //actualizo la cantidad dentro de la orden
    ]);
  });
  await Promise.all(process);
};

router.post("/", async (req, res) => {
  try {
    const { orderId, clothes } = req.body.data;
    if ((Array.isArray(clothes), validate(orderId))) {
      await orderModify(orderId, clothes);
      return res.json(
        responseMessage(SUCCESS, "Orden modificada correctamente")
      );
    } else {
      return res.json(
        responseMessage(ERROR, "Los datos proporcionados no son validos")
      );
    }
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
