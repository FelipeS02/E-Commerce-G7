const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");
const { Clothe, Category } = require("../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

//Busca el producto ingresado en el searchBar
router.get("/category/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const response = await Category.findOne({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: { model: Clothe },
    });
    if (response.length > 0) {
      return res.json(responseMessage(SUCCESS, response));
    } else {
      return res.json(
        responseMessage(
          ERROR,
          "No existe ninguna prenda perteneciente a esa categoría"
        )
      );
    }
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
