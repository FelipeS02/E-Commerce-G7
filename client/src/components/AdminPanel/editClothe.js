import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import { getProductDetail, editClothe} from '../../actions/ProductActions';

export default function EditClothe(props){
	const { id } = props.match.params;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProductDetail(id));
	},[dispatch])

	const detail = useSelector(state => state.detailState.detail)

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

    //--------------------------------------------------------------------------------------------
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

    function handleSubmit(e){
        e.preventDefault();
        input.sizeStock.forEach(talle => {
            setInput({
                ...input,
                sizes: input.sizes[talle.name] = talle.stock 
            })
        })

        dispatch(editClothe(input));
        alert('Product edited succesfully');
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
	
	return(
		<h1>{id}</h1>
	)
}