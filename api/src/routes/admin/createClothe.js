const { Router } = require("express");
const { Category, Clothe } = require("../../db");
const router = Router();

const validateReq = (data) => {
  const { name, size, price, color, stock, genre, categories } = data;
  if (
    typeof name === "string" &&
    name !== "" &&
    typeof size === "string" &&
    typeof price === "number" &&
    typeof color === "string" &&
    typeof stock === "string" &&
    typeof genre === "string" &&
    Array.isArray(categories)
  ) {
    return true;
  }
  return false;
};

const setCategories = async (categoriesArray, clothe) => {
  try {
    const clotheCategory = categoriesArray.map(async (c) => {
      const currentCategory = await Category.findOrCreate({
        where: { name: c },
      });
      currentCategory && (await clothe.addCategory(currentCategory));
    });
    await Promise.all(clotheCategory);
  } catch (err) {
    console.log(err);
  }
};

router.post("/create-clothe", async (req, res) => {
  const { data } = req.body;
  const { categories } = data;
  try {
    if (validateReq(data)) {
      const newClothe = await Clothe.create(data);
      await setCategories(categories, newClothe);
      return res.status(200).json({ Success: "Prenda creada correctamente!" });
    } else {
      return res
        .status(400)
        .json({ Error: "Uno de los datos es erroneo / esta vacio" });
    }
  } catch (err) {
    const { message } = err;
    return res.status(400).json({ message });
  }
});

module.exports = router;
