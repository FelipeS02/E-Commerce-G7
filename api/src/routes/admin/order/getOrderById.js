const { Router } = require("express");
const router = Router();
const { Order } = require("../../../db");

const jwtAuthz = require('express-jwt-authz');
const checkScopes = permissions => jwtAuthz(permissions);

router.get("/order-detail/:orderId", checkScopes(['read:admin']), async (req, res) => {
  const { orderId } = req.params;
  try {
    if (orderId && typeof orderId === "number") {
      const response = await Order.findOne({
        where: { id: orderId },
        include: { all: true },
      });
      if (response) {
        return res.status(200).json({ data: response });
      } else {
        return res
          .status(400)
          .json({ Error: "No existe ninguna orden con esta ID" });
      }
    } else {
      return res
        .status(400)
        .json({ Error: "orderId es undefined o no es de tipo integer" });
    }
  } catch (err) {
    const { message } = err;
    res.status(400).json({ message });
  }
});

module.exports = router;
