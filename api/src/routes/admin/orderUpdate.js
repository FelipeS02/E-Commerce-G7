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
    // const {
    //   params: { orderId },
    //   query: { state },
    // } = req;
    console.log('llego al back')
    const {orderId} = req.params
    const {stateOrder} = req.query
    console.log(orderId)
    console.log(stateOrder)
    const validStates = [
      "CARRITO",
      "CONFIRMADO",
      "DESPACHADO",
      "CANCELADO",
      "ENTREGADO",
    ];
    if (validStates.includes(stateOrder) && validate(orderId)) {
      await Order.update({ state: stateOrder }, orderId);
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
