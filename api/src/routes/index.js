const { Router } = require('express');
const router = Router();

// Traemos Routes
const clotheDetail = require('./clotheDetail.js')

// Usamos Routes

// Routes Users
router.use('/clothes', clotheDetail)

// Admin

module.exports = router;
