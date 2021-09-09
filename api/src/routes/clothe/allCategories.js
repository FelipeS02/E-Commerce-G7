const { Router } = require("express");
const router = Router();
const { Category, Type } = require("../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

router.get("/", async (_req, res) => {
  try {
    const [dbCategories, dbTypes] = await Promise.all([
      await Category.findAll({
        attributes: ["id", "name"],
      }),
      await Type.findAll({
        attributes: ["id", "name"],
      }),
    ]);

    const categoriesArray = dbCategories.map((e) => e.name);
    const typesArray = dbTypes.map((e) => e.name);

    const categories = Array.from(new Set([...categoriesArray]));
    const types = Array.from(new Set([...typesArray]));

    if (categories.length > 0 && types.length > 0) {
      res.json(responseMessage(SUCCESS, { categories, types }));
    } else {
      res.json(responseMessage(ERROR, "No existe ninguna categoria o tipo"));
    }
  } catch (err) {
    const { message } = err;
    res.status(400).json(responseMessage(ERROR, message));
  }
});

module.exports = router;
