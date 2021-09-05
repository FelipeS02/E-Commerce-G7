const { Router } = require("express");
const { User } = require("../../db");
const router = Router();

const jwtAuthz = require('express-jwt-authz');
const checkScopes = permissions => jwtAuthz(permissions);

router.get("/set-admin/:userId", checkScopes(['read:admin']), async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      const { name } = user;
      await user.update({ isAdmin: true });
      return res.status(200).json({
        Success: "El usuario es ahora un administrador",
        Datos: { name, idUsuario },
      });
    } else {
      return res.status(400).json({ Error: "El ID no pertenece a ningun usuario" });
    }
  } catch (err) {
    const { message } = err;
    return res.status(400).json({ message });
  }
});

module.exports = router;
