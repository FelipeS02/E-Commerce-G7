import React, { useEffect } from "react";
import Login from "../Login/Login";
import LogOut from "../Login/LogOut";
import { Navbar, Nav, Container, NavDropdown, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "../SearchBar/SearchBar";
import Logo from "./logo.png"

// Translation
import {useTranslation} from "react-i18next";

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

  // Translation
  const [t, i18n] = useTranslation("global");

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
  }, [getAccessTokenSilently, user]);

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
                {t("NavBar.Hombre")}
              </Nav.Link>
              <Nav.Link as={Link} to="/search/genre/Femenino">
                {t("NavBar.Mujer")}
              </Nav.Link>
              <Nav.Link as={Link} to="/Ofertas">
                {t("NavBar.Ofertas")}
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
                {isAuthenticated && (
                  <>
                    <NavDropdown.Item
                      eventKey="4.1"
                      as={Link}
                      to="/user/userProfile"
                    >
                      {t("NavBar.Perfil")}
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.2">
                      {t("NavBar.Mis-Pedidos")}
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.3">
                      {t("NavBar.Deseos")}
                    </NavDropdown.Item>

                    <NavDropdown.Item eventKey="4.4"></NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="nav-dropdown">
                  <NavDropdown.Item as={Link} to="/admin" eventKey="4.1">
                    Panel
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.2">Productos</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.3">Ordenes</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.4">Usuarios</NavDropdown.Item>
                </NavDropdown>
              )}
              {!isAuthenticated ? <Login /> : <LogOut />}

              <Nav.Link onClick={() => i18n.changeLanguage("es")}>ES</Nav.Link>
              <Nav.Link onClick={() => i18n.changeLanguage("en")}>EN</Nav.Link>
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
