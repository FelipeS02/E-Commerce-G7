const { Router } = require('express');
const router = Router();
// Traemos Routes
const clotheDetail = require('./clothe/clotheDetail.js')
const allClothe = require('./clothe/allClothe.js')
// Usamos Routes

// Routes Users
router.use('/clothe/allClothe', allClothe)
router.use('/clothe/:id', clotheDetail)

// Admin

module.exports = router;
