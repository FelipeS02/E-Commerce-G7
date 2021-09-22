const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const { Order } = require("../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

// Auth0
const jwtAuthz = require("express-jwt-authz");
const checkScopes = (permissions) => jwtAuthz(permissions);

router.get("/:orderId", async (req, res) => {
  try {
    const {orderId} = req.params
    const {stateOrder} = req.query
    const validStates = [
      "CARRITO",
      "CONFIRMADO",
      "DESPACHADO",
      "CANCELADO",
      "ENTREGADO",
    ];
    if (validStates.includes(stateOrder) && validate(orderId)) {
      await Order.update({ state: stateOrder }, { where: { id: orderId } });
      res.json(responseMessage(SUCCESS, "Estado actualizado correctamente"));
    } else {
      res.json(
        responseMessage(ERROR, "Alguno de los parametros es incorrecto")
      );
    }
  } catch (err) {
    const { message } = err;
    res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
