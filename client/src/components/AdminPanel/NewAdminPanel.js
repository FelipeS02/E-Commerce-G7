import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getAllUsers } from "../../actions/authActions";
import "./NewAdminPanel.css"
import { Button } from "react-bootstrap"

function NewAdminPanel(){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUsers());
    },[]);

    return(
        <div className='panel_home d-grid gap-2'>
                <Link className='panel_home_link' to='/admin/createClothe'><Button variant="outline-success" ><b>Crear producto</b></Button></Link>
                <Link className='panel_home_link' to='/admin/listproducts'><Button variant="outline-success" ><b>Productos</b></Button></Link>
                <Link className='panel_home_link' to='/admin/listDetail'><Button variant="outline-success" ><b>Ordenes</b></Button></Link>
                <Link className='panel_home_link' to='/admin/listUsers'><Button variant="outline-success" ><b>Usuarios</b></Button></Link>
        </div>
    )
}

export default NewAdminPanel;