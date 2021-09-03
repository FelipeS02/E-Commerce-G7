const { Router } = require("express");
const router = Router();
const { Clothe, User, Payment, Direction, Order } = require("../../db");


router.post('/order', async (req, res) => {
	const {userId, payment, direction, orderState, clothes} = req.body;
	const orderTotal = clothes.forEach(e => orderTotal += e.price);

})
module.exports = router;