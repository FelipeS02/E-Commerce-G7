const { Router } = require("express");
const { Category, Clothe, Media, Type, Size } = require("../../db");
const { Op } = require("sequelize");
const router = Router();

const {
    responseMessage,
    statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");
// en principio, esta ruta puede modificar el nombre, el precio, detalle, stock. Referente 
// al stock, si ya existe el talle, solo modfica el stock, si no existe el talle, etnonces 
// lo crea, tanto el talle como el stock. 

router.delete("/:idClothe/delete", async (req,res) => {
    try {
        const {idClothe} = req.params;

        Clothe.destroy({
            where: {
              id: idClothe,
            },
          })
        return res.json(responseMessage(SUCCESS,{ message : "Clote deleted"}));
    } catch (err) {
        const { message } = err;
        return res.json(responseMessage(ERROR, message));
    }
});

router.put("/:idClothe", async (req,res) => {
    try {
        const {idClothe} = req.params;
        const {name, price, sizes, detail, color, genre, categories, type} = req.body;
        
        const clotheToUpdate = await Clothe.findByPk(idClothe,{
            include : [
            {
                model: Type,
                attributes: ["id", "name"]
            },
            {
                model: Size,
                attributes: ["id", "size", "stock"],
                through: { attributes: [] }
            }
            ]});

        if(name) clotheToUpdate.name = name;
        if(price) clotheToUpdate.price = price;
        if(detail) clotheToUpdate.detail = detail;
        if(color) clotheToUpdate.color = color;
        if(genre) clotheToUpdate.genre = genre;
        clotheToUpdate.save();
        if(sizes) {
            const arrayKeys = Object.keys(sizes);

            arrayKeys.forEach(async e => {
                const sizeFound = clotheToUpdate.sizes.find(size => size.size === e);

                // si lo encuentra quiere decir que ya existia en la base de datos dicho size.
                // entonces tenemos que modificar, si no lo encuentra, añadimos un nuevo talle 
                // a la prenda.

                if(sizeFound){
                    await Size.update({
                        size: e,
                        stock: sizes[e]
                    },
                    {
                        where: {
                            id: sizeFound.id
                        }
                    });
                } else {
                    // console.log( e,sizes[e]);
                    const  newSize = await Size.create({size : e , stock : sizes[e]});
                    // console.log(newSize)
                    await clotheToUpdate.addSize(newSize);
                }
            });
        }
        if(type){
            await Type.update({
                name: type
            },{
                where : { id : clotheToUpdate.types[0].id }
            });
        }
        return res.json(responseMessage(SUCCESS, clotheToUpdate));
    } catch (err) {
        const { message } = err;
        return res.json(responseMessage(ERROR, message));
    }
});

module.exports = router;
