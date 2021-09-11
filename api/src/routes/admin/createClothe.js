const { Router } = require("express");
const { Category, Clothe, Media, Type, Size } = require("../../db");
const router = Router();
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

const validateReq = (data, files) => {
  const {
    name,
    size,
    price,
    color,
    stock,
    genre,
    categories,
    sizes,
    type,
    detail,
  } = data;
  if (
    (typeof name === "string" &&
      name !== "" &&
      typeof size === "string" &&
      typeof price === "string" &&
      typeof color === "string" &&
      typeof stock === "string" &&
      typeof genre === "string" &&
      Array.isArray(categories) &&
      typeof detail === "string" &&
      categories.length > 0 &&
      Array.isArray(files) &&
      typeof sizes === "object",
    typeof type === "string")
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

const setType = async (type, clothe) => {
  const [currentType, created] = await Type.findOrCreate({
    where: { name: type },
  });
  await clothe.addType(currentType.id);
};

const setSizes = async (sizeObject, clothe) => {
  const claves = Object.keys(sizeObject);
  const clotheSizes = claves.map(async (e) => {
    if (sizeObject[e] > 0) {
      const currentSize = await Size.create({ size: e, stock: sizeObject[e], clotheId: clothe.id });
      await clothe.addSize(currentSize.id);
    }
  });
  await Promise.all(clotheSizes);
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
// const checkScopes = (permissions) => jwtAuthz(permissions);checkScopes(['write:admin'])

router.post("/create-clothe",  async (req, res) => {
  try {
    const {
      body: { categories, type, sizes },
      files,
    } = req;
    if (validateReq(req.body, files)) {
      const newClothe = await Clothe.create(req.body);
      await Promise.all([
        await setType(type, newClothe),
        await setSizes(sizes, newClothe),
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
