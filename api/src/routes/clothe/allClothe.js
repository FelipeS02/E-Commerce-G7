const { Router } = require("express");
const router = Router();
const Category = require("../../models/Category");
const Clothe = require("../../models/Clothe");

router.get("/allClothes", async (req, res) => {
  const { currentOffset } = req.query;
  try {
    const countClothes = await Clothe.count({ col: "id" });
    const allClothes = await Clothe.findAll({
      limit: 10,
      offset: currentOffset,
      include: Category,
    });
    if (allClothes === []) {
      res.status(404).json({ noClothes: "Aun no existe ninguna prenda" });
      return;
    } else {
      res.status(200).json({
        total: countClothes,
        allClothes,
      });
      return;
    }
  } catch (err) {
    const { message } = err;
    res.status(400).json({ message });
    return;
  }
});

module.exports = router;
