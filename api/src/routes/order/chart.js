const { Router } = require("express");
const router = Router();
const { Clothe, User, Order } = require("../../db");



router.post('/chart', async (req, res) => {

	const {clothes, userId} = req.body;

	// Precio total de la orden
	const orderTotal = clothes.forEach(e => orderTotal += e.price);

	try{
		let user = await User.findAll({
			where: {id: userId},
			include: Order
		})

		let chartExist = user.Order.filter(e => e.state === "CARRITO")

		// Si ninguna orden tiene status CARRITO, la creo
		if(!chartExist){
			// Creo el carro del usuario si este no tiene
			let chartFinal = await Order.create({
				total: orderTotal
			})
			// Itero el array de ropa que me pasaron y le agrego al chart cada prenda
			clothes.forEach(clothe => {
				let clotheFinal = await Clothe.findByPk(clothe.id,{
					include: Category
				})
				chartFinal.addClothe(clotheFinal)
			})
			// Le agrego al usuario el carrito creado
			await user.addOrder(chartFinal)
			// Retorno el usuario
			return res.status(200).json(user)
		}
		// Si el usuario ya tiene un carrito
		else{
			await chartExists.destroy()
			// Le seteo el total
			let chartFinal = await Order.create({
				total: orderTotal
			})
			// Agrego cada prenda
			clothes.forEach(clothe => {
				let clotheFinal = await Clothe.findByPk(clothe.id,{
					include: Category
				})
				await chartFinal.addClothe(clotheFinal)
			})
			// Guardo los cambios realizados a la orden del usuario
			return res.status(200).json(user)
		}
	}
	catch(err){
		const {message} = err;
		return res.status(400).json(message)
	}
})
module.exports = router;