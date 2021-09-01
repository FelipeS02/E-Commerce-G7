const { Router } = require("express");
const { User } = require("../../db");
const router = Router();

router.get("/set-admin/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      const { name } = user;
      await user.update({ isAdmin: true });
      res.status(200).json({
        Success: "El usuario es ahora un administrador",
        Datos: { name, idUsuario },
      });
    } else {
      res.status(400).json({ Error: "El ID no pertenece a ningun usuario" });
    }
  } catch (err) {
    const { message } = err;
    res.status(400).json({ message });
  }
});

module.exports = router;
