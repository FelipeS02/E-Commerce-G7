const { Router } = require('express');
const router = Router();

// Traemos Routes
const clotheDetail = require('./clotheDetail.js')

// Usamos Routes
router.use('/clotheDetail', clotheDetail)

module.exports = router;
