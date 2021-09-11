import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createClothe } from "../../actions/ProductActions";
import { getCategories } from "../../actions/ProductActions";

function AdminPanel(){
    
    let sizes = ["XS", "S", "M", "L", "XL", "XXL"];

    // Traemos categorias
    useEffect(() => {
        dispatch(getCategories());
    },[]);

    const dispatch = useDispatch();
    const arrayCategories = useSelector((state) => state.productCategories.categories?.categories);
    const arrayTypes = useSelector((state) => state.productCategories.categories?.types);
    
    console.log(arrayCategories,'<<<------------soy categories----------------------');
    console.log(arrayTypes,'<<<-----------soy types-----------------------');

    const [input, setInput] = useState({
        name: '',
        price: 0,
        color: '',
        genre: '',
        detail: '',
        type:'',
        sizes: {},
        sizeStock: [{name: '',stock:0}],
        categories: [],
        files: []
    })

    function handleInput(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    
    function handleCheckBox(e){

        if(e.target.checked){
            setInput({
                ...input,
                categories:[...input.categories,e.target.value]
            });
        } else {
            setInput({
                ...input,
                categories: input.categories.filter(categorie => categorie !== e.target.value)
            });
        }
    }
//--------------------------------------------------------------------------------------------
    const handleSize = idx => e => {
        const newsizeStock = input.sizeStock.map((talle, tidx)=>{
            if(idx!==tidx) return talle;
            return {...talle, name: e.target.value}
        })
        setInput({
            ...input,
            sizeStock: newsizeStock
        })
    }

    const handleStock = idx => e => {
        const newsizeStock = input.sizeStock.map((talle, tidx)=>{
            if(idx!==tidx) return talle;
            return {...talle, stock: e.target.value}
        })
        setInput({
            ...input,
            sizeStock: newsizeStock
        })
    }

    const handleAddSizeStock = () => {
        setInput({
            ...input,
            sizeStock: input.sizeStock.concat({name: '',stock:0})
        })
    }

    const handleRemoveSizeStock = idx => () => {
        setInput({
            ...input,
            sizeStock: input.sizeStock.filter((t, tidx)=> idx !== tidx)
        })
    }

    // const handleOnChangeImg = (e) => {
    
    //     var imageArray = [];
    
    //     for(const file of e.target.files){
    //       var reader = new FileReader();
    //       (function(file) {
    //         var reader = new FileReader();
    //         reader.onload = function(image) {
    //           setImages((e) => e.concat(image.target.result))
    //         };
    //         reader.readAsDataURL(file);
    //       })(file);
    //     }
    //   };
//--------------------------------------------------------------------------------------------
    function handleSubmit(e){
        e.preventDefault();
        input.sizeStock.forEach(talle => {
            setInput({
                ...input,
                sizes: input.sizes[talle.name] = talle.stock 
            })
            
        });

        dispatch(createClothe(input));
        alert('Product created succesfully');
        setInput({
            name: '',
            price: 0,
            color: '',
            genre: '',
            detail: '',
            type: '',
            sizes: {},
            sizeStock: [{name: '',stock:0}],
            categories: [],
            files:[]
        })
    }

    return (
        <div>
            <form 
            // action='/admin/create-clothe' 
            // method='post' 
            enctype='multipart/form-data'
            onSubmit={handleSubmit}
            >
                <label>Nombre:</label>
                <input
                    type="text"
                    name='name'
                    value={input.name}
                    onChange={handleInput}
                />
                <label>Precio:</label>
                <input
                    type="number"
                    name='price'
                    value={input.price}
                    onChange={handleInput}
                />
                <label>Color:</label>
                <input
                    type="text"
                    name='color'
                    value={input.color}
                    onChange={handleInput}
                />
                <label>Género:</label>
                    <select name='genre' onChange={handleInput}>
                    <option value="Masculino" >Masculino</option>
                    <option value="Femenino" selected>Femenino</option>
                    <option value="Otro">Otro</option>
                    </select>
                <label>Detalles:</label>
                <textarea
                    type='text'
                    name='detail'
                    value={input.detail}
                    onChange={handleInput}
                />
                <label>Tipos:</label>
                {/* <span> Elegí el tipo de tu prenda  */}
                <select name='type' onChange={handleInput}>
                    {
                        arrayTypes?.map((type, i) => (
                            <option value={type} key={i}>{type}</option>
                        ))
                    }
                </select>
                {/* , si no está en las opciones, escríbilo 
                  <input
                    type="text"
                    name='type'
                    value={input.type}
                    onChange={handleInput}
                />
                </span> */}
                
                <label>Talles:</label>
                {input.sizeStock.map((talle, idx)=>(
                    <div key={`talle${idx}`}>
                       <select onChange={handleSize(idx)}>
                            {
                                sizes.map((size, i) => (
                                    <option value={talle.name} key={i}>{size}</option>
                                ))
                            }
                        </select>
                        <input
                        type='number'
                        value={talle.stock}
                        onChange={handleStock(idx)}
                        />
                        <button
                        type='button'
                        onClick={handleRemoveSizeStock(idx)}
                        >-</button>
                    </div>
                ))}
                <button
                type='button'
                onClick={handleAddSizeStock}
                >Agregar talle</button>
                <label >Categorias:</label>
                <div>
                {arrayCategories?.map((cat) =>(
                    <span key = {cat}>
                        <input 
                        type="checkbox" 
                        name='categories'
                        value={cat}
                        onChange={handleCheckBox}
                        />
                        <label >{cat}</label>
                    </span>
                ))}
                </div>
                {/* <input
                type='file'
                name='media'
                multiple
                /> */}
                <input
                type="file"
                id="file"
                name="media"
                multiple
                />


                <button type='submit'>SUBMIT</button>
            </form>
        </div>
    )
}

export default AdminPanel;