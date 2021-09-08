const { Router } = require("express");
const { Category, Clothe, Media, Type, Size } = require("../../db");
const { Op } = require("sequelize");
const router = Router();
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

const { dataBase, categorySet } = require("../../DataBase.js");

const validateReq = (data, files) => {
  let { name, price, color, stock, genre, categories, sizes, type, detail } =
    data;
  if (
    (typeof name === "string" &&
      name !== "" &&
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
    const currentCategory = await Category.findOne({
      where: { name: { [Op.iLike]: `%${c}%` } },
    });
    if (!currentCategory) {
      const newCategory = await Category.create({ name: c[0].toUpperCase() + c.substr(1)});
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
    const newType = await Type.create({ name: type[0].toUpperCase() + type.substr(1) });
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
const checkScopes = (permissions) => jwtAuthz(permissions);

router.get(
  "/charge-database",
  // Auth0
  // checkScopes(['write:admin']),
  async (_req, res) => {
    try {
      const initialCategory = categorySet.map(async (c) => {
        await Category.findOrCreate({
          where: { name: c },
        });
        await Promise.all(initialCategory);
      });
      const chargeDatabase = dataBase.map(async (data) => {
        const { categories, files, type, sizes } = data;
        console.log(data)
        if (validateReq(data, files)) {
          const newClothe = await Clothe.create(data);
          await Promise.all([
            await setType(type, newClothe),
            await setSizes(sizes, newClothe),
            await setCategories(categories, newClothe),
            await setMedia(files, newClothe),
          ]);
        } else {
          return res.json(
            responseMessage(ERROR, "Uno de los datos es erroneo / esta vacio")
          );
        }
      });
      await Promise.all(chargeDatabase);
      return res.json(
        responseMessage(SUCCESS, "Base de datos cargada corectamente")
      );
    } catch (err) {
      const { message } = err;
      return res.json(responseMessage(ERROR, message));
    }
  }
);

module.exports = router;
