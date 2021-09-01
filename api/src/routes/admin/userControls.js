const { Router } = require("express");
const { User } = require("../../db")
const router = Router();

router.get("/user-control", async (_req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json({ allUsers });
  } catch (err) {
    const { message } = err;
    res.status(400).json({ message });
  }
});

module.exports = router;
