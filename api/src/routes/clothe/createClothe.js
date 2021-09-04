const { Router } = require("express");
const { Category, Clothe } = require("../../db");
const router = Router();
const multer = require("multer");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

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
    const [category, created] = await Category.findOrCreate({
      where: { name: c },
    });
    await clothe.addCategory(category.id);
  });
  await Promise.all(clotheCategory);
};

router.post("/create-clothe", upload.array("pictures", 8), async (req, res) => {
  try {
    console.log(req.body);
    const {
      data,
      data: { categories },
    } = req.body;
    if (validateReq(data)) {
      const newClothe = await Clothe.create(data);
      await setCategories(categories, newClothe);
      return res.json(responseMessage(SUCCESS, newClothe));
    } else {
      return res.json(
        responseMessage(ERROR, "Uno de los datos es erroneo / esta vacio")
      );
    }
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
