const { Router } = require("express");
const { Category, Clothe, Media } = require("../../db");
const router = Router();
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

const { dataBase, categorySet } = require("../../database/DataBase");

const jwtAuthz = require("express-jwt-authz");
const checkScopes = (permissions) => jwtAuthz(permissions);

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
      typeof detail === "string" &&
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
      data: m.path,
    });
    await clothe.addMedia(newMedia.id);
  });
  await Promise.all(clotheMedia);
};

router.get(
  "/charge-database",
  async (_req, res) => {
    try {
      const initialCategory = categorySet.map(async (c) => {
        await Category.findOrCreate({
          where: { name: c },
        });
        await Promise.all(initialCategory);
      });
      const chargeDatabase = dataBase.map(async (data) => {
        const { categories, files } = data;
        if (validateReq(data, files)) {
          const newClothe = await Clothe.create(data);
          await Promise.all([
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
