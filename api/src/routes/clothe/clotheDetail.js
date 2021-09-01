const { Router } = require("express");
const router = Router();
const { Category, Clothe } = require("../../db");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const finalClothe = await Clothe.findByPk(id, {
      include: { model: Category },
    });
    if (finalClothe) {
      return res.status(200).json({ data: finalClothe });
    } else {
      return res.status(404).json({ errMessage: "Articulo no encontrado" });
    }
  } catch (err) {
    const { message } = err;
    return res.status(404).json({ message });
  }
});

module.exports = router;
