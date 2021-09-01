const { Router } = require('express');
const router = Router();

// Traemos Routes
const clotheDetail = require('./clothe/clotheDetail.js')
const allClothe = require('./clothe/allClothe.js')
// Usamos Routes

// Routes Users
router.use('/clothe', clotheDetail)
router.use('/clothe', allClothe)

// Admin

module.exports = router;
