const { Router } = require("express");
const User = require("../../models/User");
const router = Router();

router.get("/admin/usersControl", async (_req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json({ allUsers });
  } catch (err) {
    const { message } = err;
    res.status(400).json({ message });
  }
});

module.exports = router;
