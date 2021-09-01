const { Router } = require('express');
const router = Router();
// Traemos Routes
const clotheDetail = require('./clothe/clotheDetail.js')
const allClothe = require('./clothe/allClothe.js')
const userControls = require('../admin/usersControl.js')
const setAdmins = require('../admin/setAdmins.js')
const createClothe = require('../admin/createClothe.js')
// Usamos Routes

// Routes Users
<<<<<<< HEAD
router.use('/clothe', clotheDetail)
router.use('/clothe', allClothe)
router.use('/admin', createClothe)
router.use('/admin', userControls)
router.use('/admin', setAdmins)
=======
router.use('/clothe/allClothes', allClothe)
router.use('/clothe/:id', clotheDetail)
>>>>>>> b9ba78fe5ede3f6af3c38c435cc812b74f4c9b43

// Admin

module.exports = router;
