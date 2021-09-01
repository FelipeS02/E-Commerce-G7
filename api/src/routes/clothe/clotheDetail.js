const { Router } = require("express");
const router = Router();
const { Category, Clothe } = require("../../db");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const finalClothe = await Clothe.findByPk(id, { include: { model: Category } });
    if (finalClothe) {
      res.status(200).json({ data: finalClothe });
      return;
    } else {
      res.status(404).json({ errMessage: "Articulo no encontrado" });
      return;
    }
  } catch (err) {
    const { message } = err;
    return res.status(404).json({ message });
  }
});

module.exports = router;
