import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createClothe } from "../../actions/ProductActions";

function AdminPanel(){
    
    const disptach = useDispatch();
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

    function handleSubmit(e){
        e.preventDefault();
        disptach(createClothe({
            data: {
                name: input.name,
                size: input.size,
                price: parseInt(input.price,10),
                color: input.color,
                stock: parseInt(input.stock,10),
                genre: input.genre,
                categories: [input.categories]
            }
        }));
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
                <label>Categories:</label>
                <input
                    type="text"
                    name='categories'
                    value={input.categories}
                    onChange={handleInput}
                />
                <button type='submit'>SUBMIT</button>
            </form>
        </div>
    )
}

export default AdminPanel;