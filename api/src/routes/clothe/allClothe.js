const { Router } = require("express");
const router = Router();
const { Category, Clothe } = require("../../db");

<<<<<<< HEAD
let currentOffset = 0 + currentOffset;

router.get('/allClothe', async (_req, res) => {
=======
router.get("/", async (req, res) => {
  const { currentOffset } = req.query;
>>>>>>> b9ba78fe5ede3f6af3c38c435cc812b74f4c9b43
  try {
    const countClothes = await Clothe.count({ col: "id" });
    const allClothes = await Clothe.findAll({
      limit: 10,
      offset: currentOffset,
      include: { model: Category },
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
