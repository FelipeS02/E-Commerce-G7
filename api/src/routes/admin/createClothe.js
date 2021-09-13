const { Router } = require("express");
const { Category, Clothe, Media, Type, Size } = require("../../db");
const { Op } = require("sequelize");
const router = Router();
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

const validateReq = (data, files) => {
  console.log('a validar')
  const {
    name,
    price,
    color,
    genre,
    detail,
    type,
    sizeName,
    sizeStock,
    categories
  } = data;
  console.log(`name => ${name}`)
  console.log(`price => ${price}`)
  console.log(`color => ${color}`)
  console.log(`genre => ${genre}`)
  console.log(`detail => ${detail}`)
  console.log(`type => ${type}`)
  console.log(`sizeName => ${sizeName}`)
  console.log(`sizeStock => ${sizeStock}`)
  console.log(`categories => ${categories}`)
  console.log(`files => ${files}`)
  if (
    (typeof name === "string" &&
      name !== "" &&
      typeof price === "string" &&
      typeof color === "string" &&
      typeof genre === "string" &&
      typeof detail === "string" &&
      typeof type === "string") &&
      // Array.isArray(sizeName) &&
      // sizeName.length > 0 &&
      // Array.isArray(sizeStock) &&
      // sizeStock.length> 0 &&
      // sizeName.length === sizeStock.length &&
      // Array.isArray(categories) &&
      // categories.length > 0 &&
      Array.isArray(files)
  ) {
    console.log('se valido')
    return true;
  }
  console.log('algo llego mal')
  return false;
};

const setCategories = async (categoriesArray, clothe) => {
if(Array.isArray(categoriesArray)){  const clotheCategory = categoriesArray.map(async (c) => {
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
} else {
    const currentCategory = await Category.findOne({
      where: { name: { [Op.iLike]: `%${categoriesArray}%` } },
    });
    if (!currentCategory) {
      const newCategory = await Category.create({
        name: categoriesArray[0].toUpperCase() + categoriesArray.substr(1),
      });
      await clothe.addCategory(newCategory.id);
    } else {
      await clothe.addCategory(currentCategory.id);
    }
  }
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
  console.log('se cargo el typo')
};

const setSizes = async (sN, sS, clothe) => {
  let sizeObject = {}
  let sizeN = []
  let sizeS = []
  if(!Array.isArray(sN)){
    sizeN.push(sN);
    sizeS.push(sS)
  }else {
    sizeN = sizeN.concat(sN);
    sizeS = sizeS.concat(sS);
  }
  for(i=0; i<sizeN.length; i++){
    sizeObject[sizeN[i]] = sizeS[i]
  }
  const claves = Object.keys(sizeObject);
  const clotheSizes = claves.map(async (e) => {
    if (sizeObject[e] > 0) {
      const currentSize = await Size.create({ size: e, stock: sizeObject[e], clotheId: clothe.id });
      await clothe.addSize(currentSize.id);
    }
  });
  await Promise.all(clotheSizes);
  console.log('se cargaron los talles')
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
  console.log('se cargaron las imagenes')
};

// Auth0
const jwtAuthz = require("express-jwt-authz");
// const checkScopes = (permissions) => jwtAuthz(permissions);checkScopes(['write:admin'])

router.post("/",async (req, res) => {
  console.log('esto llego')
  console.log(req.body)
  console.log(req.files)
  try {
    const {
      body: { categories, type, sizeName, sizeStock },
      files,
    } = req;
    if (validateReq(req.body, files)) {
      const newClothe = await Clothe.create(req.body);
      await Promise.all([
        await setType(type, newClothe),
        await setSizes(sizeName, sizeStock, newClothe),
        await setCategories(categories, newClothe),
        await setMedia(files, newClothe),
      ]);
      console.log('se creo la prenda')
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
