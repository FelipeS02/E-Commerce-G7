const { Router } = require("express");
const router = Router();
const { Category, Clothe, Media, Type, Size, Review } = require("../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const finalClothe = await Clothe.findOne({
      where: { id },
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
        {
          model: Review,
          attributes: ["score", "review"]
        },
      ],
    });

    if (finalClothe) {
      return res.json(responseMessage(SUCCESS, finalClothe));
    } else {
      return res.json(responseMessage(ERROR, "Articulo no encontrado"));
    }
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
