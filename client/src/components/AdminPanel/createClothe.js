import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createClothe, getCategories } from "../../actions/ProductActions";
import { validate } from './validateCreate'
import { Form, Button } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom";

function AdminPanel(){
    let history = useHistory();
    let sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    let genres = ["Masculino", "Femenino", "Otro"]

    // Traemos categorias
    useEffect(() => {
        dispatch(getCategories());
    },[]);

    const dispatch = useDispatch();
    const arrayCategories = useSelector((state) => state.productCategories.categories?.categories);
    const arrayTypes = useSelector((state) => state.productCategories.categories?.types);
    
    const [input, setInput] = useState({
        name: '',
        price: 0,
        color: '',
        genre: '',
        detail: '',
        type:'',
        sizeStock: [{name: '',stock:0}],
        categories: [],
        newCategories: [],
        mediaArray: null
    })

    const [errors, setErrors] = useState({});

    const handleNewCategory = idx => e => {
        const newCategory = input.newCategories.map((newCat, cidx)=>{
            if(idx!==cidx) return newCat;
            return {...newCat, name: e.target.value}
        })
        setInput({
            ...input,
            newCategories: newCategory
        })
        setErrors(validate({
            ...input,
            newCategories: newCategory
        }));
    }

    const handleAddNewCategory = () => {
        setInput({
            ...input,
            newCategories: input.newCategories.concat({name: ''})
        })
        setErrors(validate({
            ...input,
            newCategories: input.newCategories.concat({name: ''})
        }))
    }

    const handleRemoveNewCategory = idx => () => {
        setInput({
            ...input,
            newCategories: input.newCategories.filter((c, cidx)=> idx !== cidx)
        })
        setErrors(validate({
            ...input,
            newCategories: input.newCategories.filter((c, cidx)=> idx !== cidx)
        }))
    }

    function handleInput(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }
    
    function handleCheckBox(e){

        if(e.target.checked){
            setInput({
                ...input,
                categories:[...input.categories,e.target.value]
            });
            setErrors(validate({
                ...input,
                categories:[...input.categories,e.target.value]
            }))
        } else {
            setInput({
                ...input,
                categories: input.categories.filter(categorie => categorie !== e.target.value)
            });
            setErrors(validate({
                ...input,
                categories: input.categories.filter(categorie => categorie !== e.target.value)
            }))
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
        setErrors(validate({
            ...input,
            sizeStock: newsizeStock
        }));
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
        setErrors(validate({
            ...input,
            sizeStock: newsizeStock
        }));
    }

    const handleAddSizeStock = () => {
        setInput({
            ...input,
            sizeStock: input.sizeStock.concat({name: '',stock:0})
        })
        setErrors(validate({
            ...input,
            sizeStock: input.sizeStock.concat({name: '',stock:0})
        }))
    }

    const handleRemoveSizeStock = idx => () => {
        setInput({
            ...input,
            sizeStock: input.sizeStock.filter((t, tidx)=> idx !== tidx)
        })
        setErrors(validate({
            ...input,
            sizeStock: input.sizeStock.filter((t, tidx)=> idx !== tidx)
        }))
    }

    const handlerOnChangeMedia = (e) => {
        setInput({
            ...input,
            mediaArray: Object.values(e.target.files)
        })
        setErrors(validate({
            ...input,
            mediaArray: Object.values(e.target.files)
        }))
    }

    function handleSubmit(e){
        e.preventDefault();
        if (Object.keys(errors).length === 0&&input.name!==''&&input.sizeStock.length>0&&input.categories.length>0&&input.mediaArray>0) {
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
                newCategories: [],
                mediaArray: null
            })
            history.push("/admin");
        }else alert("Check all fields");
    }

    return (
        <div style={{backgroundColor: '#EAEDED', padding: '5rem'}}>
            <h1 style={{marginBottom: '3rem'}}>Create Clothe</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group  className="mb-3">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control
                        autoComplete='off'
                        className={errors.name && 'danger'}
                        type="text"
                        name='name'
                        value={input.name}
                        onChange={handleInput}
                        />
                    {errors.name && (<p className="danger">{errors.name}</p>)}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Precio:</Form.Label>
                    <Form.Control
                        autoComplete='off'
                        className={errors.price && 'danger'}
                        type="number"
                        name='price'
                        value={input.price}
                        onChange={handleInput}
                        />
                    {errors.price && (<p className="danger">{errors.price}</p>)}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Color:</Form.Label>
                    <Form.Control
                        autoComplete='off'
                        className={errors.color && 'danger'}
                        type="text"
                        name='color'
                        value={input.color}
                        onChange={handleInput}
                        />
                    {errors.color && (<p className="danger">{errors.color}</p>)}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Género:</Form.Label>
                        <div>
                            <select className={errors.genre && 'danger'} style={{padding: '0.6rem', }} name='genre' onChange={handleInput}>
                                <option></option>
                                {genres.map((g, i) => (
                                    <option value={g} key={i}>{g}</option>
                                ))}
                            </select>
                            {errors.genre && (<p className="danger">{errors.genre}</p>)}
                        </div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Detalles:</Form.Label>
                    <Form.Control as="textarea" rows={3}
                        className={errors.detail && 'danger'}
                        type='text'
                        name='detail'
                        value={input.detail}
                        onChange={handleInput}
                        />
                    {errors.detail && (<p className="danger">{errors.detail}</p>)}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tipos:</Form.Label>
                        <div>
                            <select className={errors.type && 'danger'} style={{padding: '0.6rem', }} name='type' onChange={handleInput}>
                                <option></option>
                                {arrayTypes?.map((type, i) => (
                                    <option value={type} key={i}>{type}</option>
                                ))}
                            </select>
                            {errors.type && (<p className="danger">{errors.type}</p>)}
                        </div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Talles:</Form.Label>
                    {errors.sizeStock && (<p className="danger">{errors.sizeStock}</p>)}
                    {input.sizeStock.map((talle, idx)=>(
                        <Form.Group className="mb-3" key={`talle${idx}`}>
                            <select style={{padding: '0.6rem', marginRight: '1rem' }} value={talle.name} onChange={handleSize(idx)}>
                                <option></option>
                                {sizes.map((size, i) => (
                                    <option value={size} key={i}>{size}</option>
                                ))}
                            </select>
                            <input style={{padding: '.37rem', width: '7rem', marginRight: '1rem'}}
                            className={errors.stock && 'danger'}
                            type='number'
                            value={talle.stock}
                            onChange={handleStock(idx)}
                            />
                            
                            <Button variant="dark"
                            type='button'
                            onClick={handleRemoveSizeStock(idx)}
                            >-</Button>
                            {errors[`size${idx}`] && (<p className="danger">{errors[`size${idx}`]}</p>)}
                            {errors[`stock${idx}`]&& (<p className="danger">{errors[`stock${idx}`]}</p>)}
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
                                />
                                <label >{cat}</label>
                            </span>
                        ))}
                        {errors.categories&& (<p className="danger">{errors.categories}</p>)}
                    </Form.Group>
                    <Form.Group className="mb-3">
                    {input.newCategories?.map((cat, idx)=>(
                        <Form.Group className="mb-3" key={`cat${idx}`}>
                        <Form.Group className="mb-3" style={{ display: 'flex'}}>
                            <Form.Control
                            style={{ width: '7rem', marginRight: '1rem'}}
                            autoComplete='off'
                            className={errors.newCategory && 'danger'}
                            type='text'
                            name='newCategorie'
                            value={cat.name}
                            onChange={handleNewCategory(idx)}
                            />
                            <Button variant="dark"
                            type='button'
                            onClick={handleRemoveNewCategory(idx)}
                            >-</Button>
                        </Form.Group>
                        {errors[`newCategory${idx}`] && (<p className="danger">{errors[`newCategory${idx}`]}</p>)}
                        </Form.Group>
                    ))}
                    <Button variant="dark"
                    type='button'
                    onClick={handleAddNewCategory}
                    >Agregar nueva categoria</Button>
                </Form.Group>
                </Form.Group>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Control type="file" multiple onChange={handlerOnChangeMedia}/>
                    {errors.mediaArray&& (<p className="danger">{errors.mediaArray}</p>)}
                </Form.Group>
                <Button variant="dark" type='submit'>SUBMIT</Button>
                <Link style={{marginLeft: '2rem'}} to="/admin">
                    <Button variant="danger" type='submit'>CANCEL</Button>
                </Link>
            </Form>
        </div>
    )
}

export default AdminPanel;