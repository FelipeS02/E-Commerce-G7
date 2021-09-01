const { Router } = require("express");
const router = Router();
const { Category, Clothe } = require("../../db");

router.get("/allClothe", async (req, res) => {
  const { currentOffset } = req.query;
  try {
    const countClothes = await Clothe.count({ col: "id" });
    const allClothes = await Clothe.findAll({
      limit: 10,
      offset: currentOffset,
      include: { model: Category },
    });
    if (allClothes.length === 0) {
      return res.status(404).json({ noClothes: "Aun no existe ninguna prenda" });
    } else {
      return res.status(200).json({
        total: countClothes,
        allClothes,
      });
    }
  } catch (err) {
    const { message } = err;
    return res.status(400).json({ message });
  }
});

module.exports = router;
