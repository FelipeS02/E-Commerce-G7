const { Router } = require("express");
const router = Router();

// Traemos Routes
const clotheDetail = require("./clothe/clotheDetail.js");
const allClothes = require("./clothe/allClothes.js");
const userControls = require("./admin/userControls.js");
const setAdmins = require("./admin/setAdmins.js");
const createClothe = require("./admin/createClothe.js");
const getUserOrders = require("./clothe/order/getUserOrders.js");
const orderAdd = require("./clothe/order/orderAdd.js");
const orderUpdate = require("./admin/orderUpdate.js");
const orderConfirm = require("./clothe/order/orderConfirm");
const getOrderById = require("./clothe/order/getOrderById.js");
const chargeDatabase = require("./admin/chargeDb.js");
const deleteFromOrder = require("./clothe/order/deleteFromOrder.js");
const allCategories = require("./clothe/allCategories.js");
const login = require("./login/login.js");
// Usamos Routes
// Routes Users
router.use("/clothe", allCategories);
router.use("/clothe", allClothes);
router.use("/clothe", clotheDetail);

router.use("/clothe", orderAdd);
router.use("/clothe", getOrderById);
router.use("/clothe", getUserOrders);
router.use("/clothe", deleteFromOrder);
router.use("/clothe", orderConfirm);

// Admin
router.use("/admin", createClothe);
router.use("/admin", userControls);
router.use("/admin", setAdmins);
router.use("/admin", orderUpdate);
router.use("/admin", chargeDatabase);
router.use("/login", login);
module.exports = router;
