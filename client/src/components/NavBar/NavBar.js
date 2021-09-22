import React, { useEffect } from "react";
import Login from "../Login/Login";
import LogOut from "../Login/LogOut";
import { Navbar, Nav, Container, NavDropdown, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "../SearchBar/SearchBar";
import Logo from "./logo.png";

import {
  addingUserToDB,
  getAccessToken,
  removingUserInfo,
} from "../../actions/authActions.js";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../Cart/Cart";
const NavBar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const userState = useSelector((state) => state.userState);
  const { userInfo } = userState;

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        getAccessToken(accessToken);
        dispatch(addingUserToDB(user.name, user.email));
      } catch (e) {
        console.log(e.messsage);
      }
    };
    getUserMetadata();
  }, [getAccessTokenSilently, user, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(removingUserInfo());
    }
  }, [dispatch, isAuthenticated]);
  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "200px" }}
            navbarScroll
          ></Nav>
          <Container>
            <Nav className="justify-content-center align-content-center">
              <Nav.Link as={Link} to="/search/genre/Masculino">
                Hombre
              </Nav.Link>
              <Nav.Link as={Link} to="/search/genre/Femenino">
                Mujer
              </Nav.Link>
            </Nav>
          </Container>
          <Container>
            <SearchBar />
          </Container>
          <Container>
            <Nav className="justify-content-end align-items-center">
              <Nav.Item>
                <Cart />
              </Nav.Item>

              <NavDropdown
                title={
                  isAuthenticated ? (
                    <img
                      src={user.picture}
                      class="rounded-circle"
                      width="35"
                      alt={user.name}
                    />
                  ) : (
                    <FaUser size="1.3rem" />
                  )
                }
                id="nav-dropdown"
              >
                {isAuthenticated ? (
                  <>
                    <NavDropdown.Item
                      eventKey="4.1"
                      as={Link}
                      to="/user/userProfile"
                    >
                      Mi Perfil
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.2">
                      Mis pedidos
                    </NavDropdown.Item>
                  </>
                ) : (
                  <NavDropdown.Item eventKey="4.4">
                    Inicia sesión para ver opciones
                  </NavDropdown.Item>
                )}
              </NavDropdown>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="nav-dropdown">
                  <NavDropdown.Item as={Link} to="/admin" eventKey="4.1">
                    Panel
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {!isAuthenticated ? <Login /> : <LogOut />}
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
