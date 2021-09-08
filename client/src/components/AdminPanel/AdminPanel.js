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
        stock: 0,
        categories: []
    })

    function handleInput(e){
        if(e.target.name==='sizes'){
            setInput({
                ...input,
                
            })
        }else{
            setInput({
                ...input,
                [e.target.name] : e.target.value
            })
        }
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
    function handleSubmit(e){
        e.preventDefault();
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
            stock: 0,
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
                <input
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
                />
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