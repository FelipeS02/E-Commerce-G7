const { Router } = require("express");
const User = require("../../models/User");
const router = Router();

<<<<<<< HEAD
router.get("/usersControl/:idUsuario", async (req, res) => {
=======
router.get("/admin/usersControl/:idUsuario", async (req, res) => {
  const { idUsuario } = req.params;
>>>>>>> b9ba78fe5ede3f6af3c38c435cc812b74f4c9b43
  try {
    const user = await User.findByPk(idUsuario);
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
