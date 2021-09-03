const { Router } = require("express");
const router = Router();

// Traemos Routes
const clotheDetail = require("./clothe/clotheDetail.js");
const allClothes = require("./clothe/allClothes.js");
const clothesByName = require("./clothe/clothesByName.js");
const clothesByCategory = require("./clothe/filterByCategory.js");
const userControls = require("./admin/userControls.js")
const setAdmins = require("./admin/setAdmins.js");
const createClothe = require("./admin/createClothe.js");
// Usamos Routes
// Routes Users
router.use("/clothe", allClothes);
router.use("/clothe", clotheDetail);
router.use("/clothe", clothesByName);
router.use("/clothe", clothesByCategory);

// Admin
router.use("/admin", createClothe);
router.use("/admin", userControls);
router.use("/admin", setAdmins);

module.exports = router;