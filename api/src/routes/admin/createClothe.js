const { Router } = require("express");
const { Category, Clothe, Media } = require("../../db");
const router = Router();
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

const validateReq = (data, files) => {
  const { name, size, price, color, stock, genre, categories } = data;
  if (
    (typeof name === "string" &&
      name !== "" &&
      typeof size === "string" &&
      typeof price === "string" &&
      typeof color === "string" &&
      typeof stock === "string" &&
      typeof genre === "string" &&
      Array.isArray(categories) &&
      categories.length > 0,
    Array.isArray(files))
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

const setMedia = async (mediaArray, clothe) => {
  const clotheMedia = mediaArray.map(async (m) => {
    const newMedia = await Media.create({
      type: m.mimetype,
      name: m.originalname,
    });
    await clothe.addMedia(newMedia.id);
  });
  await Promise.all(clotheMedia);
};

// Auth0
const jwtAuthz = require("express-jwt-authz");
const checkScopes = (permissions) => jwtAuthz(permissions);

router.post("/create-clothe", checkScopes(['write:admin']), async (req, res) => {
  try {
    const {
      body: { categories },
      files,
    } = req;
    if (validateReq(req.body, files)) {
      const newClothe = await Clothe.create(req.body);
      await Promise.all([
        await setCategories(categories, newClothe),
        await setMedia(files, newClothe),
      ]);
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
