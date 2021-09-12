import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail, editClothe, getCategories} from '../../actions/ProductActions';
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function EditClothe(props){
	const { id } = props.match.params;

	const dispatch = useDispatch();

	useEffect(() => {
        dispatch(getCategories());
	},[dispatch])

    const prenda = useSelector(state => state.detailState.detail)
    const {name: nombre, price:precio, color:colores, genre:genero, detail:detalle, types:tipos, sizes:talles, categories:categorias} = prenda
    console.log(prenda)
    console.log(tipos)

    const [input, setInput] = useState({
        name: '',
        price: 0,
        color: '',
        genre: '',
        detail: '',
        type:'',
        sizeStock: [],
        categories: [],
        mediaArray: null
    })
    console.log(input)

    const getDetail = () => {
        dispatch(getProductDetail(id));

        const category = categorias?.map(e => e.name);

        talles?.forEach(e => {
            handleAddSizeStock(e.size, e.stock)
        })

        detalle && setInput({
            ...input,
            name: nombre,
            price: precio,
            color: colores,
            genre: genero,
            detail: detalle,
            type: tipos[0]?.name,
            categories: input.categories.concat(category)
        })
    }

    let history = useHistory();
    let sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    let genres = ["Masculino", "Femenino", "Otro"];

    const arrayCategories = useSelector((state) => state.productCategories.categories?.categories);
    const arrayTypes = useSelector((state) => state.productCategories.categories?.types);

    //--------------------------------------------------------------------------------------------
    function handleInput(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleChecked(name, array){
        if(array.includes(name)){
            return true;
        }
        else{
            return false;
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

    const handleAddSizeStock = (talle = '', stock = 0) => {
        setInput({
            ...input,
            sizeStock: input.sizeStock.concat({name: talle,stock:stock})
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
        input.categories?.forEach(c=>{
            data.append('categories', c)
        })
        input.sizeStock?.forEach(talle => {
            data.append('sizeName', talle.name)
            data.append('sizeStock', talle.stock)
        });
        input.mediaArray?.forEach(f=>{
            data.append('media', f)
        })

        dispatch(editClothe(data));
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
        history.push("/admin");
    }
	
    return (
        <div style={{backgroundColor: '#EAEDED', padding: '5rem'}}>
            <button onClick={getDetail}></button>
            <h1 style={{marginBottom: '3rem'}}>Edit Clothe</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control
                        type="text"
                        name='name'
                        value={input.name}
                        onChange={handleInput}
                        />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Precio:</Form.Label>
                    <Form.Control
                        type="number"
                        name='price'
                        value={input.price}
                        onChange={handleInput}
                        />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Color:</Form.Label>
                    <Form.Control
                        type="text"
                        name='color'
                        value={input.color}
                        onChange={handleInput}
                        />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Género:</Form.Label>
                        <div>
                            <select style={{padding: '0.6rem', }} name='genre' onChange={handleInput} default={input.genre}>
                                <option hidden disabled value=""></option>
                                {genres.map((g, i) => (
                                    <option
                                        value={g}
                                        key={i}
                                    >
                                    {g}
                                    </option>
                                ))}
                            </select>
                        </div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Detalles:</Form.Label>
                    <Form.Control as="textarea" rows={3}
                        type='text'
                        name='detail'
                        value={input.detail}
                        onChange={handleInput}
                        />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tipos:</Form.Label>
                        <div>
                            <select style={{padding: '0.6rem', }} name='type' onChange={handleInput} defaultValue={input.type}>
                                <option hidden disabled value=""></option>
                                {
                                    arrayTypes?.map((type, i) => (
                                        <option value={type} key={i}>{type}</option>
                                    ))
                                }
                            </select>
                        </div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Talles:</Form.Label>
                    {input.sizeStock.map((talle, idx)=>(
                        <Form.Group className="mb-3" key={`talle${idx}`}>
                            <select style={{padding: '0.6rem', marginRight: '1rem' }} value={talle.name} onChange={handleSize(idx)}>
                                <option></option>
                                {sizes.map((size, i) => (
                                    <option value={size} key={i}>{size}</option>
                                ))}
                            </select>
                            <input style={{padding: '.37rem', width: '7rem', marginRight: '1rem'}}
                            type='number'
                            value={talle.stock}
                            onChange={handleStock(idx)}
                            />
                            <Button variant="dark"
                            type='button'
                            onClick={handleRemoveSizeStock(idx)}
                            >-</Button>
                        </Form.Group>
                    ))}
                    <Button variant="dark"
                    type='button'
                    onClick={handleAddSizeStock}
                    >Agregar talle</Button>
                </Form.Group>               
                <Form.Group className="mb-3">
                    <Form.Label >Categorias:</Form.Label>
                    <Form.Group className="mb-3" style={{padding: '.5rem'}}>
                        {arrayCategories?.map((cat) =>(
                            <span style={{padding: '1rem'}} key = {cat}>
                                <input
                                type="checkbox" 
                                name='categories'
                                value={cat}
                                onChange={handleCheckBox}
                                checked={handleChecked(cat, input.categories)}
                                />
                                <label >{cat}</label>
                            </span>
                        ))}
                    </Form.Group>
                </Form.Group>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Control type="file" multiple onChange={handlerOnChangeMedia}/>
                </Form.Group>
                <Button variant="dark" type='submit'>SUBMIT</Button>
                <Link style={{marginLeft: '2rem'}} to="/admin">
                    <Button variant="danger" type='submit'>CANCEL</Button>
                </Link>
            </Form>
        </div>
    )
}