import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

const AdminPanel = () => {
    
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
        disptach()
    }

    return (
        <div>
            <form action="submit">
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
                    type="number"
                    name='stock'
                    value={input.stock}
                    onChange={handleInput}
                />
            </form>
        </div>
    )
}
