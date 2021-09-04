const { Router } = require("express");
const { Order_clothes, OrderProduct, Clothe } = require("../../../db");
const { Op } = require("sequelize");
const router = Router();

router.delete("/order-delete/:orderId/:orderProductId", async (req, res) => {
  const { orderId, orderProductId } = req.params;
  if (
    orderId &&
    typeof orderId === "number" &&
    clotheId &&
    typeof clotheId === "number"
  ) {
    const orderClothe = await Order_clothes.findOne({
      where: {
        [Op.and]: [{ orderId: orderId }, { orderProductId: orderProductId }],
      },
    });
    if (!orderClothe) {
      return res
        .status(400)
        .json({ Error: "Este producto no esta ligado a esta orden" });
    } else {
      const currentProduct = await OrderProduct.findByPk(orderProductId);
      await Clothe.increment(["stock"], { by: currentProduct.quantity });
      const result = await orderClothe.destroy();
      await currentProduct.destroy;

      if (result === 1) {
        return res.status(200).json({
          Success: `Producto #${orderProductId} eliminado de orden #${orderId}`,
        });
      } else {
        return res.status(400).json({
          Success: `El producto no pudo ser eliminado de la orden`,
        });
      }
    }
  } else {
    return res.status(400).json({
      Error:
        "orderId y clotheId no deben ser undefined y deben ser de tipo integer",
    });
  }
});
