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

router.get("/:orderId", checkScopes(['read:admin']), async (req, res) => {
  try {
    const {
      params: { orderId },
      query: { state },
    } = req;
    const validStates = [
      "CARRITO",
      "CONFIRMADO",
      "DESPACHADO",
      "CANCELADO",
      "ENTREGADO",
    ];
    if (validStates.includes(state) && validate(orderId)) {
      const order = await Order.update({ state: state }, orderId);
      if (order[0] === 1) {
        res.json(responseMessage(SUCCESS, "Estado actualizado correctamente"));
      } else {
        res.json(
          responseMessage(ERROR, "Ocurrio un error al actualizar el estado")
        );
      }
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
