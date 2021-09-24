import React from "react";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import { useTranslation } from "react-i18next";

const LogOut = () => {
  const { logout } = useAuth0();
  const [t, i18n] = useTranslation("global");
  return (
    <Button
      variant="danger"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      {t("Login.Salir")}
    </Button>
  );
};

export default LogOut;
