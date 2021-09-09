const { Router } = require("express");
const router = Router();

// Import de Routes
const chargeDb = require("./chargeDb.js");
const createClothe = require("./createClothe.js");
const orderUpdate = require("./orderUpdate.js");
const setAdmins = require("./setAdmins.js");
const userControls = require("./userControls.js");

// Use de Routes
router.use("/admin", chargeDb);
router.use("/admin", createClothe);
router.use("/admin", orderUpdate);
router.use("/admin", setAdmins);
router.use("/admin", userControls);

module.exports = router;