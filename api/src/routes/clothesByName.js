const express = require('express');
const router = express.Router();
const {Clothe, Category} = require('../db');

//Busca el producto ingresado en el searchBar
router.get('/search/:name', async (req,res,next) => {
    try {
         let response = await Clothe.findAll({
                        where : {
                            [Op.iLike] : `%${req.params.name}%`
                        },
                        include : Category
                    });
        res.status(200).send(response);
    } catch (err) {
        next(err)
    }
});
