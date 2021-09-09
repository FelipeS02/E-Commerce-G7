const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");
const { Category, Clothe, Media, Size, Type } = require("../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

router.get("/", async (req, res) => {
  try {
    const {
      offset = 0,
      category = "",
      type = "",
      size = "",
      name = "",
      genre = "",
      color = "",
    } = req.query;

    let response;
    const validSizes = ["XS", "S", "M", "L", "XL", "XXL"];

    if (validSizes.includes(size)) {
      response = await Clothe.findAndCountAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
          color: { [Op.iLike]: `%${color}%` },
          genre: { [Op.iLike]: `%${genre}%` },
        },
        order: [["id", "ASC"]],
        distinct: true,
        offset: offset,
        limit: 10,
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
            where: { name: { [Op.iLike]: `%${category}%` } },
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
            where: { size: size },
            through: { attributes: [] },
          },
          {
            model: Type,
            attributes: ["id", "name"],
            where: { name: { [Op.iLike]: `%${type}%` } },
            through: { attributes: [] },
          },
        ],
      });
    } else {
      response = await Clothe.findAndCountAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        order: [["id", "ASC"]],
        distinct: true,
        offset: offset,
        limit: 10,
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
            where: { name: { [Op.iLike]: `%${category}%` } },
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
            where: { name: { [Op.iLike]: `%${type}%` } },
            through: { attributes: [] },
          },
        ],
      });
    }
    if (response.rows.length === 0) {
      return res.json(
        responseMessage(ERROR, "No existe ninguna prenda actualmente.")
      );
    } else {
      return res.json(
        responseMessage(SUCCESS, {
          offset,
          total: response.count,
          allClothes: response.rows,
        })
      );
    }
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
