const { Router } = require("express");
const { Category, Clothe, Type, Size, clothe_category, clothe_size } = require("../../db");
const router = Router();

const {
    responseMessage,
    statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");
// en principio, esta ruta puede modificar el nombre, el precio, detalle, stock. Referente 
// al stock, si ya existe el talle, solo modfica el stock, si no existe el talle, etnonces 
// lo crea, tanto el talle como el stock. 

router.delete("/delete/:id", async (req,res) => {
    try {
        const {id} = req.params;
        console.log(req.params)
        Clothe.destroy({
            where: {
              id: id,
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
        console.log(req.body);
        const {idClothe} = req.params;
        const {name, price, sizeName, sizeStock, detail, color, genre, categories, type} = req.body;

        const clotheToUpdate = await Clothe.findByPk(idClothe,{
            include : [
            {
                model: Type,
                attributes: ["id", "name"],
                through: { attributes: [] }
            },
            {
                model: Size,
                attributes: ["id", "size", "stock"],
                through: { attributes: ["clotheId","sizeId"] }
            },
            {
                model: Category,
                attributes: ["id", "name"],
                through: { attributes : ["categoryId","clotheId"] }
            }
            ]});
            console.log(clotheToUpdate.categories[0].clothe_category.categoryId,'<<<---soy la prenda a actualizar!!"!')
        if(name) clotheToUpdate.name = name;
        if(price) clotheToUpdate.price = price;
        if(detail) clotheToUpdate.detail = detail;
        if(color) clotheToUpdate.color = color;
        if(genre) clotheToUpdate.genre = genre;
        clotheToUpdate.save();
        if(sizeName && sizeStock) {
            let sizeObject = {}
            let sizeN = []
            let sizeS = []
            if(!Array.isArray(sizeName)){
              sizeN.push(sizeName);
              sizeS.push(sizeStock);
            }else {
              sizeN = sizeN.concat(sizeName);
              sizeS = sizeS.concat(sizeStock);
            }
            for(i=0; i<sizeN.length; i++){
              sizeObject[sizeN[i]] = sizeS[i]
            }
            for(let i = 0; i < clotheToUpdate.sizes.length; i++){
                try {
                    await clothe_size.destroy({where : {
                        clotheId:clotheToUpdate.sizes[i].clothe_size.clotheId,
                        sizeId:clotheToUpdate.sizes[i].clothe_size.sizeId,
                    }});
                } catch (err) {
                    const { message } = err;
                    return res.json(responseMessage(ERROR, message));
                }
            }
            console.log(sizeObject);

            const arrayKeys = Object.keys(sizeObject);

            arrayKeys.forEach(async e => {
                // const sizeFound = clotheToUpdate.sizes.find(size => size.size === e);

                // si lo encuentra quiere decir que ya existia en la base de datos dicho size.
                // entonces tenemos que modificar, si no lo encuentra, añadimos un nuevo talle 
                // a la prenda.

                // if(sizeFound){
                //         await Size.update({
                //             size: e,
                //             stock: sizeObject[e]
                //         },
                //         {
                //             where: {
                //                 id: sizeFound.id
                //             }
                //         });
                // } else {
                    const  newSize = await Size.create({size : e , stock : sizeObject[e]});
                    await clotheToUpdate.addSize(newSize);
                // }
            });
        }
        if(type){
            await Type.update({
                name: type
            },{
                where : { id : clotheToUpdate.types[0].id }
            });
        }
        if(categories){
            if(!Array.isArray(categories)) {var arrayCategories = categories.split(' ');}
            // console.log(arrayCategories)
            arrayCategories = categories;
            for(let i = 0; i < clotheToUpdate.categories.length; i++){
                try {
                    
                    await clothe_category.destroy({where : {
                       
                            categoryId:clotheToUpdate.categories[i].clothe_category.categoryId,
                            clotheId:clotheToUpdate.categories[i].clothe_category.clotheId,
                        
                    }});
                } catch (err) {
                    const { message } = err;
                    return res.json(responseMessage(ERROR, message));
                }
            }
            arrayCategories.map(async cat => {
                const newCategory = await Category.create({name : cat});
                        await clotheToUpdate.addCategory(newCategory);
                
                // const categoryFound = await Category.findOne({where :{ name :  cat}});
                //     if(!categoryFound){
                //         const newCategory = await Category.create({name : cat});
                //         await clotheToUpdate.addCategory(newCategory);
                //     } else {
                //         await clotheToUpdate.addCategory(categoryFound);
                //     }
            });
        }
            // if(!Array.isArray(categories)){
            //     let e = categories;
            //    for(let i = 0; i < clotheToUpdate.categories.length; i++){
            //     if(clotheToUpdate.categories[i].name !== e){
            //         const categoryFound = await Category.findOne({where :{ name :  e}});
            //         if(!categoryFound){
            //                 const newCategory = await Category.create({ name : e });
            //                 await clotheToUpdate.addCategory(newCategory);
            //         } else {
            //             await clotheToUpdate.addCategory(categoryFound);
            //         }
            //     } 
            // }
            // } else {
            //     categories.forEach(async category => {
            //         const e = category.toLowerCase();
            //         for(let i = 0; i < clotheToUpdate.categories.length; i++){
            //             if(clotheToUpdate.categories[i].name !== e){
            //                 const categoryFound = await Category.findOne({where :{ name :  e}});
            //                 if(!categoryFound){
            //                         const newCategory = await Category.create({ name : e });
            //                         await clotheToUpdate.addCategory(newCategory);
            //                 } else {
            //                     await clotheToUpdate.addCategory(categoryFound);
            //                 }
            //             } 
            //         }
            // })}
            
        return res.json(responseMessage(SUCCESS, clotheToUpdate));
    } catch (err) {
        const { message } = err;
        return res.json(responseMessage(ERROR, message));
    }
});

module.exports = router;
