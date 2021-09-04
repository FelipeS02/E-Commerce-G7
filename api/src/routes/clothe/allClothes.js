const { Router } = require("express");
const router = Router();
const { Category, Clothe } = require("../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

router.get("/all-clothes", async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const countClothes = await Clothe.count({ col: "id" });
    const allClothes = await Clothe.findAll({
      limit,
      offset,
      include: { model: Category },
    });
    if (allClothes.length === 0) {
      return res.json(
        responseMessage(ERROR, "No existe ninguna prenda actualmente.")
      );
    } else {
      return res.status(200).json({
        total: countClothes,
        allClothes,
      });
    }
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
