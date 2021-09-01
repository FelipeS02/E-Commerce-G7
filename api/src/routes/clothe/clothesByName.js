const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");
const { Clothe, Category } = require("../../db");

//Busca el producto ingresado en el searchBar
router.get("/", async (req, res) => {
  const { name } = req.query;
  console.log(req.query);
  try {
    const response = await Clothe.findAll({
      where: {name: { [Op.iLike]: `%${name}%`}},
      include: { model: Category },
    });
    if (response.length > 0) {
      return res.status(200).json({ data: response });
    } else {
      return res
        .status(404)
        .json({ error: "No existe ninguna prenda con ese nombre" });
    }
  } catch (err) {
    const { message } = err;
    return res.status(400).json({ message });
  }
});

module.exports = router;
