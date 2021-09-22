import React from "react";
import { Link } from "react-router-dom";
import "./NewAdminPanel.css"
import { Button } from "react-bootstrap"

function NewAdminPanel(){
    

    return(
        <div className='panel_home d-grid gap-2'>
                <Link className='panel_home_link' to='/admin/createClothe'><Button variant="secondary" size="lg">Crear prenda</Button></Link>
                <Link className='panel_home_link' to='/admin/listproducts'><Button variant="secondary" size="lg">Listado de prendas</Button></Link>
                <Link className='panel_home_link' to='/admin/listDetail'><Button variant="secondary" size="lg">Listado de ordenes</Button></Link>
                <Button variant="secondary" size="lg">Listado de usuarios</Button>
        </div>
    )
}

export default NewAdminPanel;