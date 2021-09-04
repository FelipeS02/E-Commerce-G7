const { Router } = require("express");
const { User } = require("../../db");
const router = Router();
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

router.get("/user-control", async (_req, res) => {
  try {
    const allUsers = await User.findAll();
    return res.json(responseMessage(SUCCESS, allUsers));
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
