const { Router } = require("express");
const router = Router();
const { Order } = require("../../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../../controller/responseMessages");

router.get("/order-detail/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    if (typeof orderId === "number") {
      const response = await Order.findOne({
        where: { id: orderId },
        include: { all: true },
      });
      if (response) {
        return res.json(responseMessage(SUCCESS, response));
      } else {
        return res.json(responseMessage(ERROR, "Esa orden es inexistente"));
      }
    } else {
      return res.json(
        responseMessage(
          ERROR,
          "El id debe ser un numero y no puede estar vacio"
        )
      );
    }
  } catch (err) {
    const { message } = err;
    res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
