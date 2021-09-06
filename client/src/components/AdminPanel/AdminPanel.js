import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createClothe } from "../../actions/ProductActions";
import { getCategories } from "../../actions/ProductActions";

function AdminPanel(){
    
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.productCategories.categories);
    
    console.log(categories,'<<<----------------------------------');

    useEffect(() => {
        dispatch(getCategories());
    },[]);

    const [input, setInput] = useState({
        name: '',
        size: '',
        price: 0,
        color: '',
        stock: 0,
        genre: '',
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
    function handleSubmit(e){
        e.preventDefault();
        dispatch(createClothe({data: input}));
        alert('Product created succesfully');
        setInput({
            name: '',
            size: '',
            price: 0,
            color: '',
            stock: 0,
            genre: '',
            categories: []
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    name='name'
                    value={input.name}
                    onChange={handleInput}
                />
                <label>Size:</label>
                <input
                    type="text"
                    name='size'
                    value={input.size}
                    onChange={handleInput}
                />
                <label>Price:</label>
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
                <label>Stock:</label>
                <input
                    type="number"
                    name='stock'
                    value={input.stock}
                    onChange={handleInput}
                />
                <label>Genre:</label>
                <input
                    type="text"
                    name='genre'
                    value={input.genre}
                    onChange={handleInput}
                />
                <label >Categories:</label>
                        <div>
                        {categories?.map((categorie) =>(
                                <span key = {categorie.id}>
                                    <input 
                                    type="checkbox" 
                                    name='types'
                                    value={categorie.name}
                                    onChange={handleCheckBox}
                                    />
                                    <label >{categorie.name}</label>
                                </span>
                        ))}
                </div>
                <button type='submit'>SUBMIT</button>
            </form>
        </div>
    )
}

export default AdminPanel;