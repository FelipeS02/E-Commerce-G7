import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

function AdminPanel(){
    return(
        <div>
            <Link to="/admin/createClothe">
                <div>Crear prenda</div>
            </Link>
            <Link>
                <div>Editar prenda</div>
            </Link>
            <Link>
                <div>Eliminar prenda</div>
            </Link>
        </div>
    )
}

export default AdminPanel;