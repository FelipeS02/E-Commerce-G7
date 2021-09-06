const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");
const { Clothe, Category, Media, Size, Type } = require("../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

//Busca el producto ingresado en el searchBar
router.get("/", async (req, res) => {
  try {
    const { name, limit, offset } = req.query;

    const total = await Clothe.count({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
    const allClothes = await Clothe.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      order: [["id", "ASC"]],
      offset,
      limit,
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

    if (allClothes.length > 0) {
      return res.json(
        responseMessage(SUCCESS, { offset, limit, total, allClothes })
      );
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
