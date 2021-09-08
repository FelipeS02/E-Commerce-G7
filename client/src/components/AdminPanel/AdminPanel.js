import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createClothe } from "../../actions/ProductActions";
import { getCategories } from "../../actions/ProductActions";

function AdminPanel(){
    
    useEffect(() => {
        dispatch(getCategories());
    },[]);

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.productCategories.categories);
    
    console.log(categories,'<<<----------------------------------');


    const [input, setInput] = useState({
        name: '',
        price: 0,
        color: '',
        genre: '',
        detail: '',
        type:'',
        sizes: {},
        sizeStock: [{name: '',stock:0}],
        categories: []
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
//--------------------------------------------------------------------------------------------
    function handleSubmit(e){
        e.preventDefault();
        input.sizeStock.forEach(talle => {
            setInput({
                ...input,
                sizes: input.sizes[talle.name] = talle.stock 
            })
            
        });

        dispatch(createClothe(
            {
                name: input.name,
                price: input.price,
                color: input.color,
                genre: input.genre,
                detail: input.detail,
                type: input.type,
                sizes: input.sizes,
                categories: input.categories
            }
            ));
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
            categories: []
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                <label>Genero:</label>
                <input
                    type="text"
                    name='genre'
                    value={input.genre}
                    onChange={handleInput}
                />
                <label>Detalles:</label>
                <textarea
                    type='text'
                    name='detail'
                    value={input.detail}
                    onChange={handleInput}
                />
                <label>Tipos:</label>
                <input
                    type="text"
                    name='type'
                    value={input.type}
                    onChange={handleInput}
                />
                <label>Talles:</label>
                {input.sizeStock.map((talle, idx)=>(
                    <div key={`talle${idx}`}>
                        <input
                        type='text'
                        value={talle.name}
                        onChange={handleSize(idx)}
                        />
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


                {/* <input
                    type="text"
                    name='size'
                    value={input.size}
                    onChange={handleInput}
                />
                <label>Stock:</label>
                <input
                    type="number"
                    name='stock'
                    value={input.stock}
                    onChange={handleInput}
                /> */}
                <label >Categorias:</label>
                        <div>
                        {categories?.map((cat) =>(
                                <span key = {cat}>
                                    <input 
                                    type="checkbox" 
                                    name='types'
                                    value={cat}
                                    onChange={handleCheckBox}
                                    />
                                    <label >{cat}</label>
                                </span>
                        ))}
                </div>
                <button type='submit'>SUBMIT</button>
            </form>
        </div>
    )
}

export default AdminPanel;