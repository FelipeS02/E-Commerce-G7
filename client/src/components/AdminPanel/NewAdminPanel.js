import React from "react";
import { Link } from "react-router-dom";
import "./NewAdminPanel.css"
import { Button } from "react-bootstrap"
import {useTranslation} from "react-i18next";

function NewAdminPanel(){
    
    const [t, i18n] = useTranslation("global");
    return(
        <div className='panel_home d-grid gap-2'>
                <Link className='panel_home_link' to='/admin/createClothe'><Button variant="secondary" size="lg">{t("Panel.Crear")}</Button></Link>
                <Link className='panel_home_link' to='/admin/listproducts'><Button variant="secondary" size="lg">{t("Panel.Listado")}</Button></Link>
                <Link className='panel_home_link' to='/admin/listDetail'><Button variant="secondary" size="lg">{t("Panel.Ordenes")}</Button></Link>
                <Button variant="secondary" size="lg">{t("Panel.Usuarios")}</Button>
        </div>
    )
}

export default NewAdminPanel;