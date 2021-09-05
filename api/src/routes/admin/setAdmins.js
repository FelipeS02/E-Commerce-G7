const { Router } = require("express");
const { User } = require("../../db");
const router = Router();
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

const jwtAuthz = require('express-jwt-authz');
const checkScopes = permissions => jwtAuthz(permissions);

router.get("/set-admin/:userId", checkScopes(['read:admin']), async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      await user.update({ isAdmin: true });
      return res.json(responseMessage(SUCCESS, user))
    } else {
      return res.json(responseMessage(ERROR, "No existe ningun usuario con ese ID"))
    }
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
