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
    price,
    color,
    genre,
    detail,
    type,
    sizes,
    categories,
  } = data;
  if (
    (typeof name === "string" &&
      name !== "" &&
      typeof price === "string" &&
      typeof color === "string" &&
      typeof genre === "string" &&
      typeof detail === "string" &&
      typeof type === "string" &&
      typeof sizes === "object" &&
      Array.isArray(categories) &&
      categories.length > 0 
      // Array.isArray(files)
    )
  ) {
    return true;
  }
  return false;
};

const setCategories = async (categoriesArray, clothe) => {
  const clotheCategory = categoriesArray.map(async (c) => {
    const currentCategory = await Category.findOne({
      where: { name: { [Op.iLike]: `%${c}%` } },
    });
    if (!currentCategory) {
      const newCategory = await Category.create({
        name: c[0].toUpperCase() + c.substr(1),
      });
      await clothe.addCategory(newCategory.id);
    } else {
      await clothe.addCategory(currentCategory.id);
    }
  });
  await Promise.all(clotheCategory);
};

const setType = async (type, clothe) => {
  const currentType = await Type.findOne({
    where: { name: { [Op.iLike]: `%${type}%` } },
  });

  if (!currentType) {
    const newType = await Type.create({
      name: type[0].toUpperCase() + type.substr(1),
    });
    await clothe.addType(newType.id);
  } else {
    await clothe.addType(currentType.id);
  }
};

const setSizes = async (sizeObject, clothe) => {
  const claves = Object.keys(sizeObject);
  const clotheSizes = claves.map(async (e) => {
    if (sizeObject[e] > 0) {
      const currentSize = await Size.create({ size: e, stock: sizeObject[e] });
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

router.post("/create-clothe", async (req, res) => {
  try {
    const { categories, type, sizes, files } = req.body;
    console.log(req.body)
    if (validateReq(req.body, files)) {
      console.log('aqui va bien')
      const newClothe = await Clothe.create(req.body);
      await Promise.all([
        await setType(type, newClothe),
        await setSizes(sizes, newClothe),
        await setCategories(categories, newClothe),
      //   await setMedia(files, newClothe),
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
