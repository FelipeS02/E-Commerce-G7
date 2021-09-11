import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createClothe, getCategories } from "../../actions/ProductActions";

function AdminPanel(){
    
    let sizes = ["", "XS", "S", "M", "L", "XL", "XXL"];
    let genres = ["", "Masculino", "Femenino", "Otro"]

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
        sizeStock: [{name: '',stock:0}],
        categories: [],
        mediaArray: null
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

    const handlerOnChangeMedia = (e) => {
        setInput({
            ...input,
            mediaArray: Object.values(e.target.files)
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        const data = new FormData()
        data.append('name', input.name)
        data.append('price', input.price)
        data.append('color', input.color)
        data.append('genre', input.genre)
        data.append('detail', input.detail)
        data.append('type', input.type)
        input.categories.forEach(c=>{
            data.append('categories', c)
        })
        input.sizeStock.forEach(talle => {
            data.append('sizeName', talle.name)
            data.append('sizeStock', talle.stock)
        });
        input.mediaArray.forEach(f=>{
            data.append('media', f)
        })

        dispatch(createClothe(data));
        alert('Product created succesfully');
        setInput({
            name: '',
            price: 0,
            color: '',
            genre: '',
            detail: '',
            type: '',
            sizeStock: [{name: '',stock:0}],
            categories: [],
            mediaArray: null
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name='name'
                    value={input.name}
                    onChange={handleInput}
                />
                </div>
                <div>
                <label>Precio:</label>
                <input
                    type="number"
                    name='price'
                    value={input.price}
                    onChange={handleInput}
                />
                </div>
                <div>
                <label>Color:</label>
                <input
                    type="text"
                    name='color'
                    value={input.color}
                    onChange={handleInput}
                />
                </div>
                <div>
                <label>Género:</label>
                    <select name='genre' onChange={handleInput}>
                        {genres.map((g, i) => (
                            <option value={g} key={i}>{g}</option>
                        ))}
                    </select>
                </div>
                <div>
                <label>Detalles:</label>
                <textarea
                    type='text'
                    name='detail'
                    value={input.detail}
                    onChange={handleInput}
                />
                </div>
                <div>
                <label>Tipos:</label>
                <select name='type' onChange={handleInput}>
                    {
                        arrayTypes?.map((type, i) => (
                            <option value={type} key={i}>{type}</option>
                        ))
                    }
                </select>
                </div>
                <div>
                <label>Talles:</label>
                {input.sizeStock.map((talle, idx)=>(
                    <div key={`talle${idx}`}>
                        <select value={talle.name} onChange={handleSize(idx)}>
                            {
                                sizes.map((size, i) => (
                                    <option value={size} key={i}>{size}</option>
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
                </div>               
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
                <div>
                <input
                type="file"
                name="file"
                multiple
                onChange={handlerOnChangeMedia}
                />
                </div>
                <button type='submit'>SUBMIT</button>
            </form>
        </div>
    )
}

export default AdminPanel;