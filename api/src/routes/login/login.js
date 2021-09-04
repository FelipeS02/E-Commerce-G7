const { Router } = require("express");
const router = Router();
const { User } = require("../../db");


router.post('/login', async (req, res) => {
	const { name, email, token } = req.body;

	try{
		userExists = User.findByPk(email)
		if(!userExists){
			const newUser = User.create({
				name: name,
				email: email,
				isAdmin: isAdmin
			})
			return res.status(200).json({message: "Usuario creado", userData: })
		}
		if(userExists){
			return res.status(200).json({succes: true})
		}
	}
	catch(err){
		const {message} = err
		return res.status(400).json(message)
	}
})

module.exports = router;