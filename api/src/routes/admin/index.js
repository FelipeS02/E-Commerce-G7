const { Router } = require("express");
const router = Router();

// Import de Routes
const chargeDb = require("./chargeDb.js");
const createClothe = require("./createClothe.js");
const orderUpdate = require("./orderUpdate.js");
const userControls = require("./userControls.js");
const updateClothe = require("./updateClothe.js");

// Use de Routes
router.use("/charge-database", chargeDb);
router.use("/create-clothe", createClothe);
router.use("/order-update", orderUpdate);
router.use("/users-control", userControls);
router.use("/update-clothe", updateClothe);

module.exports = router;
