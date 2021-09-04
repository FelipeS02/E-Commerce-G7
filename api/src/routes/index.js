const { Router } = require("express");
const router = Router();

// Traemos Routes
const clotheDetail = require("./clothe/clotheDetail.js");
const allClothes = require("./clothe/allClothes.js");
const clothesByName = require("./clothe/clothesByName.js");
const filterByCategory = require("./clothe/filterByCategory.js");
const userControls = require("./admin/userControls.js")
const setAdmins = require("./admin/setAdmins.js");
const createClothe = require("./clothe/createClothe.js");
const getUserOrders = require("./admin/order/getUserOrders.js")
const orderAdd = require("./admin/order/orderAdd.js");
const orderUpdate= require("./admin/order/orderUpdate.js");
const getOrderById= require("./admin/order/getOrderById.js")
const deleteFromOrder= require("./admin/order/deleteFromOrder.js")

// Usamos Routes
// Routes Users
router.use("/clothe", allClothes);
router.use("/clothe", clotheDetail);
router.use("/clothe", clothesByName);
router.use("/clothe", filterByCategory);

// Admin
router.use("/admin", createClothe);
router.use("/admin", userControls);
router.use("/admin", setAdmins);
router.use("/admin", getUserOrders)
router.use("/admin", orderAdd)
router.use("/admin", orderUpdate);
router.use("/admin", getOrderById)

module.exports = router;