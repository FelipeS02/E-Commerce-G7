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
router.use("/all-categories", allCategories);
router.use("/all-clothes", allClothes);
router.use("/clothe-details", clotheDetail);

// Rutas de order
router.use("/order-add/:userId", orderAdd);
router.use("/order-detail/:orderId", getOrderById);
router.use("/users-order", getUserOrders);
router.use("/order-delete/:orderId/:clotheId", deleteFromOrder);
router.use("/order-confirm/:userId/:orderId", orderConfirm);

module.exports = router;
