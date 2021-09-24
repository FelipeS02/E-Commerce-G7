const { Router } = require("express");
const { User } = require("../../db");
const router = Router();
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

// const jwtAuthz = require("express-jwt-authz");
// const checkScopes = (permissions) => jwtAuthz(permissions);

router.get("/:userId", 
// checkScopes(["read:admin"]), 
async (req, res) => {
  const { userId } = req.params;
  try {
    await User.update({ isAdmin: true }, userId);
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
});
router.get("/:userId?role=addAdmin", 
// checkScopes(["read:admin"]), 
async (req, res) => {
  const { userId } = req.params;
  console.log('estamon seteando admin')
  try {
    await User.update({ isAdmin: true }, userId);
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
});
router.get("/:userId?role=removeAdmin", 
// checkScopes(["read:admin"]), 
async (req, res) => {
  const { userId } = req.params;
  try {
    await User.update({ isAdmin: false }, userId);
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
