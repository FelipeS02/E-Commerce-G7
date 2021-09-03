const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");
const { Clothe, Category } = require("../../db");

//Busca el producto ingresado en el searchBar
router.get("/category/:name", async (req, res) => {
    const name  = req.params.name;
    //   console.log(req.params.name);
    try {
    const response = await Category.findOne({
      where: {name: { [Op.iLike]: `%${name}%`}},
      include: { model: Clothe }
    });
    if (response.length > 0) {
      return res.status(200).json({ data: response });
    } else {
      return res
        .status(404)
        .json({ error: "No existe ninguna prenda perteneciente a esa categoría" });
    }
  } catch (err) {
    const { message } = err;
    return res.status(400).json({ message });
  }
});

module.exports = router;
