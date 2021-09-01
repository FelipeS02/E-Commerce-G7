const router = require('express').Router();
const sequelize = require('sequelize');
const { Clothe, Category } = require('../db.js');

router.get('/:id', async (req, res) => {
	const { id } = req.params

	try{
		const finalClothe = await Clothe.findByPk(id, 
			{include: Category}
		)
		return res.status(200).json(finalClothe)
	}
	catch(error){
		return res.status(404).json(error)
	}
})

module.exports = router