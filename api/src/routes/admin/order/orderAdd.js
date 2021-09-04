const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const { Clothe, User, Order } = require("../../../db");

const clotheRelation = async (clothes, order) => {
  let clothesPromises = clothes.map((e) => {
    const newRelation = await Clothe.findByPk(e.id);
    await order.addClothe(newRelation);
  });
  await Promise.all(clothesPromises);
};

router.post("/order-add/:userId", async (req, res) => {
  const { userId } = req.params;
  const { clothes } = req.body.data;
  if (clothes && userId && validate(userId) && Array.isArray(clothes)) {
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
      if (userOrder.length === 0) {
        // Si ninguna orden tiene status CARRITO, la creo
        const user = User.findByPk(userId);
        const orderTotal = clothes.forEach((e) => (orderTotal += e.price)); // Precio total de la orden
        const newOrder = await Order.create({
          // Creo un carro nuevo
          total: orderTotal,
        });
        await clotheRelation(clothes, newOrder); // Itero el array de ropa que me pasaron y le agrego a la orden cada prenda
        await user.addOrder(newOrder); // Le agrego al usuario el carrito creado
        return res.status(200).json({ data: user }); // Retorno el usuario
      } else {
        // Si el usuario ya tiene un carrito
        // Busco la orden
        const currentOrder = Order.findByPk(userOrder[0].orders[0].id);
        // Agrego cada prenda
        await clotheRelation(clothes, currentOrder);
        return res.status(200).json({
          Success: "Orden actualizada correctamente!",
          data: currentOrder,
        });
      }
    } catch (err) {
      const { message } = err;
      return res.status(400).json({ message });
    }
  } else {
    return res.status(400).json({
      Error:
        "Uno de los datos enviados es incorrecto (checkear que el array clothes contenga objetos con id de prenda y precio, y userId sea de tipo uuid)",
    });
  }
});
module.exports = router;
