const { Router } = require("express");
const router = Router();

// Import de Routes
const chargeDb = require("./chargeDb.js");
const createClothe = require("./createClothe.js");
const orderUpdate = require("./orderUpdate.js");
const setAdmins = require("./setAdmins.js");
const userControls = require("./userControls.js");

// Use de Routes
router.use("/charge-database", chargeDb);
router.use("/create-clothe", createClothe);
router.use("/order-update", orderUpdate);
router.use("/set-admin", setAdmins);
router.use("/users-control", userControls);

module.exports = router;