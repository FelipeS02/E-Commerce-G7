import React from "react";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import {useTranslation} from "react-i18next";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const [t, i18n] = useTranslation("global");
  return (
    <Button variant="primary" onClick={() => loginWithRedirect()}>
      {t("Login.Ingresar")}
    </Button>
  );
};

export default Login;
