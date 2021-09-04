const { Order_clothes } = require("../../../db");
const { Op } = require("sequelize");

router.delete("/order-delete/:orderId/:clotheId", (req, res) => {
  const { orderId, clotheId } = req.params;
  if (
    orderId &&
    typeof orderId === "number" &&
    clotheId &&
    typeof clotheId === "number"
  ) {
    const orderClothe = await Order_clothes.findOne({
      where: {
        [Op.and]: [{ clotheId: clotheId }, { orderId: orderId }],
      },
    });
    if (!orderClothe) {
      return res
        .status(400)
        .json({ Error: "Este producto no esta ligado a esta orden" });
    } else {
      const result = await orderClothe.destroy();
      if (result === 1) {
        return res.status(200).json({
          Success: `Producto #${clotheId} eliminado de orden #${orderId}`,
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
