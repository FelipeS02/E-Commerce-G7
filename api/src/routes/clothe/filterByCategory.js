const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");
const { Clothe, Category, Type, Size } = require("../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

router.get("/category/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const response = await Category.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: {
        model: Clothe,
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
      },
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
