const { Router } = require("express");
const router = Router();


// Imports de rutas ropa
const allCategories = require("./allCategories.js");
const allClothes = require("./allClothes.js");
const clotheDetail = require("./clotheDetail.js");
// Imports de rutas order
const orderAdd = require("./order/orderAdd.js");
const getOrderById = require("./order/getOrderById.js");
const getUserOrders = require("./order/getUserOrders.js");
const deleteFromOrder = require("./order/deleteFromOrder.js");
const orderConfirm = require("./order/orderConfirm.js"); 

// Rutas de ropa
router.use("/clothe", allCategories);
router.use("/clothe", allClothes);
router.use("/clothe", clotheDetail);
// Rutas de order
router.use("/clothe", orderAdd);
router.use("/clothe", getOrderById);
router.use("/clothe", getUserOrders);
router.use("/clothe", deleteFromOrder);
router.use("/clothe", orderConfirm);

module.exports = router;