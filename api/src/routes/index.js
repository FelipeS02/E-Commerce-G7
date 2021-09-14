const { Router } = require("express");
const router = Router();

// Import de Routes
const clotheRoutes = require("./clothe/index.js");
const adminRoutes = require("./admin/index.js");
const login = require("./login/login.js");

// Use de Routes
router.use("/clothe", clotheRoutes);
router.use("/admin", adminRoutes);
router.use("/login", login);

module.exports = router;
