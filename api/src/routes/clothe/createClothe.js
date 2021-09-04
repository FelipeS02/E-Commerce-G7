const { Router } = require("express");
const { Category, Clothe } = require("../../db");
const router = Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const validateReq = (data) => {
  const { name, size, price, color, stock, genre, categories } = data;
  if (
    typeof name === "string" &&
    name !== "" &&
    typeof size === "string" &&
    typeof price === "number" &&
    typeof color === "string" &&
    typeof stock === "number" &&
    typeof genre === "string" &&
    Array.isArray(categories) &&
    categories.length > 0
  ) {
    return true;
  }
  return false;
};

const setCategories = async (categoriesArray, clothe) => {
  const clotheCategory = categoriesArray.map(async (c) => {
    const findCategory = await Category.findOne({ where: { name: c } });
    if (!findCategory) {
      const newCategory = await Category.create({ name: c });
      await clothe.addCategory(newCategory.id);
    } else {
      await clothe.addCategory(findCategory.id);
    }
  });
  await Promise.all(clotheCategory);
};

router.post("/create-clothe", upload.array("pictures", 8), async (req, res) => {
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
