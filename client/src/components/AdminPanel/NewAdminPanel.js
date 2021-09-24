import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../actions/authActions";
import "./NewAdminPanel.css";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function NewAdminPanel() {
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="panel_home d-grid gap-2">
      <Link className="panel_home_link" to="/admin/createClothe">
        <Button variant="outline-success">
          <b>{t("Panel.Crear")}</b>
        </Button>
      </Link>
      <Link className="panel_home_link" to="/admin/listproducts">
        <Button variant="outline-success">
          <b>{t("Panel.Listado")}</b>
        </Button>
      </Link>
      <Link className="panel_home_link" to="/admin/listDetail">
        <Button variant="outline-success">
          <b>{t("Panel.Ordenes")}</b>
        </Button>
      </Link>
      <Link className="panel_home_link" to="/admin/listUsers">
        <Button variant="outline-success">
          <b>{t("Panel.Usuarios")}</b>
        </Button>
      </Link>
    </div>
  );
}

export default NewAdminPanel;
