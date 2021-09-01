const { Router } = require("express");
const Category = require("../../models/Category");
const Clothe = require("../../models/Clothe");
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

<<<<<<< HEAD
router.post("/create-clothe", async (req, res) => {
=======
router.post("/admin/create-clothe", async (req, res) => {
  const { data } = req.body;
  const { categories } = data;
>>>>>>> b9ba78fe5ede3f6af3c38c435cc812b74f4c9b43
  try {
    if (validateReq(data)) {
      const newClothe = await Clothe.create(data);
      await setCategories(categories, newClothe);
      res.status(200).json({ Success: "Prenda creada correctamente!" });
      return;
    } else {
      res
        .status(400)
        .json({ Error: "Uno de los datos es erroneo / esta vacio" });
    }
  } catch (err) {
    const { message } = err;
    res.status(400).json({ message });
  }
});

module.exports = router;
