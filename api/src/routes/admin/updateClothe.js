const { Router } = require("express");
const { Category, Clothe, Media, Type, Size } = require("../../db");
const router = Router();

const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");
// en principio, esta ruta puede modificar el nombre, el precio, detalle, stock. Preguntar si 
// también hacemos que se puedan agregar nuevas fotos o eliminar.
router.put("/:idClothe", async (req,res) => {
    try {
        const {idClothe} = req.params;
        const {name, price, sizes, detail} = req.body;
        // console.log(sizes);
        
        const clotheToUpdate = await Clothe.findByPk(idClothe,{
            include :
            {
                model: Size,
                attributes: ["id", "size", "stock"],
                through: { attributes: [] }
            }
            });
        // console.log(clotheToUpdate.dataValues);
        // console.log(clotheToUpdate.dataValues.sizes[0].dataValues);
        
        if(name) clotheToUpdate.name = name;
        if(price) clotheToUpdate.price = price;
        if(detail) clotheToUpdate.detail = detail;
        clotheToUpdate.save();
        if(sizes) {
            const arrayKeys = Object.keys(sizes);
            // console.log(arrayKeys)
            arrayKeys.forEach(async e => {
                const sizeFound = clotheToUpdate.sizes.find(size => size.size === e);
                // si lo encuentra quiere decir que ya ewxistia en la base de datos dicho size.
                // entonces tenemos que modificar, si no lo encuentra, añadimos un nuevo talle 
                // a la prenda.
                // console.log(sizeFound,'<<----size encontrado------');
                if(sizeFound){
                    // console.log(clotheToUpdate.sizes.indexOf(sizeFound));
                    const index = clotheToUpdate.sizes.indexOf(sizeFound);
                    clotheToUpdate.sizes[index].stock = sizes[e];
                    // console.log(clotheToUpdate.sizes[index].size);
                    // console.log(sizes[e]);
                    clotheToUpdate.save();
                } else {
                    console.log( e,sizes[e]);
                    const  newSize = await Size.create({size : e , stock : sizes[e]});
                    console.log(newSize)
                    await clotheToUpdate.addSize(newSize);
                }
            });
        }
        return res.json(responseMessage(SUCCESS, clotheToUpdate));
    } catch (err) {
        const { message } = err;
        return res.json(responseMessage(ERROR, message));
    }
})

module.exports = router;
