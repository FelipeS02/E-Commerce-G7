const { Router } = require("express");
const router = Router();
const { Category, Clothe, Media } = require("../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const finalClothe = await Clothe.findByPk(id, {
      include: [{ model: Category }, { model: Media }],
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
