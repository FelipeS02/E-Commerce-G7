const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");
const { Clothe, Category, Media } = require("../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

//Busca el producto ingresado en el searchBar
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const response = await Clothe.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: [{ model: Category }, { model: Media }],
    });
    if (response.length > 0) {
      return res.json(responseMessage(SUCCESS, response));
    } else {
      return res.json(
        responseMessage(ERROR, "No existe ninguna prenda con ese nombre")
      );
    }
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
