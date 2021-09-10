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
router.use("/clothe-details", clotheDetail);
router.use("/all-categories", allCategories);
router.use("/all-clothes", allClothes);

// Rutas de order
router.use("/order-add", orderAdd);
router.use("/order-detail", getOrderById);
router.use("/users-orders", getUserOrders);
router.use("/order-delete", deleteFromOrder);
router.use("/order-confirm", orderConfirm);

module.exports = router;
