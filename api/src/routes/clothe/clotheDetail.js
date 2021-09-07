const { Router } = require("express");
const router = Router();
const { Category, Clothe, Media, Type, Size } = require("../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const finalClothe = await Clothe.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        {
          model: Media,
          attributes: ["type", "name"],
          through: { attributes: [] },
        },
        {
          model: Size,
          attributes: ["id", "size", "stock"],
          through: { attributes: [] },
        },
        {
          model: Type,
          attributes: ["id", "name"],
          through: { attributes: [] },
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
