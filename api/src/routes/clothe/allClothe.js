const { Router } = require("express");
const router = Router();
const { Clothe, Category } = require("../../db");

let currentOffset = 0 + currentOffset;

router.get('/allClothe', async (_req, res) => {
  try {
    const allClothes = await Clothe.findAll({ limit: 10, offset: 0, include: Category });
    if (allClothes === []) {
      res.status(404).json({ noClothes: "Aun no existe ninguna prenda" });
      return;
    } else {
      res.status(200).json({ allClothes });
      return;
    }
  } catch (err) {
    const { message } = err;
    res.status(400).json({ message });
    return;
  }
});

module.exports = router;
