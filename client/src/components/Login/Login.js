import React from "react";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { authorized } from "../../actions/authActions";

const Login = () => {
  const { loginWithRedirect, getAccessTokenSilently, getUser } = useAuth0();
  const clickHandler = async () => {
    console.log("somethin");
    await loginWithRedirect();
    //logged in. you can get the user profile like this:
    const user = await getUser();
    console.log("user", user);
  };
  return (
    <Button variant="primary" onClick={clickHandler}>
      Login
    </Button>
  );
};

export default Login;
