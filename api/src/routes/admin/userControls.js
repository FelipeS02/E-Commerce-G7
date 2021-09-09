const { Router } = require("express");
const { User } = require("../../db");
const router = Router();
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

const jwtAuthz = require('express-jwt-authz');
const checkScopes = permissions => jwtAuthz(permissions);

router.get("/", checkScopes(['read:admin']), async (_req, res) => {
  try {
    const allUsers = await User.findAll();
    return res.json(responseMessage(SUCCESS, allUsers));
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
