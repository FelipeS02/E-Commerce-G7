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



router.post("/admin/create-clothe", async (req, res) => {
  try {
    const { data } = req.body.data;
    if (validateReq(data)) {
      await Clothe.create(data);
      res.status(200).json({ Success: "Prenda creada correctamente!" });
      return;
    } else {
      res
        .status(400)
        .json({ Error: "Uno de los datos es erroneo / esta vacio" });
    }
  } catch (err) {
      const { message } = err;
      res.status(400).json({message})
  }
});

module.exports = router;
