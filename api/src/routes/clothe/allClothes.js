const { Router } = require("express");
const router = Router();
const { Category, Clothe, Media, Size } = require("../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

router.get("/all-clothes", async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const countClothes = await Clothe.count({ col: "id" });
    const allClothes = await Clothe.findAll({
      order: [["id", "ASC"]],
      offset: offset,
      limit: limit,
      include: [
        {
          model: Category,
          attributes: ["id", "name"],
        },
        {
          model: Media,
          attributes: ["type", "name"],
        },
        {
          model: Size,
          attributes: ["id", "size", "stock"],
        },
        {
          model: Type,
          attributes: ["id", "name"],
        },
      ],
    });
    if (allClothes.length === 0) {
      return res.json(
        responseMessage(ERROR, "No existe ninguna prenda actualmente.")
      );
    } else {
      return res.json(
        responseMessage(SUCCESS, {
          offset,
          limit,
          total: countClothes,
          allClothes,
        })
      );
    }
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
