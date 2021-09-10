import React, { useEffect } from "react";
import Login from "../Login/Login";
import LogOut from "../Login/LogOut";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "../SearchBar/SearchBar";
import {
  addingUserToDB,
  getAccessToken,
  removingUserInfo
} from "../../actions/authActions.js";
import { useDispatch, useSelector } from "react-redux";
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
          Logo
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
              <Nav.Link as={Link} to="/Hombre">
                Hombre
              </Nav.Link>
              <Nav.Link as={Link} to="/Mujer">
                Mujer
              </Nav.Link>
              <Nav.Link as={Link} to="/Ofertas">
                Ofertas
              </Nav.Link>
            </Nav>
          </Container>
          <Container>
            <SearchBar />
          </Container>
          <Container>
            <Nav className="justify-content-end align-items-center">
              <Nav.Item>
                <FaShoppingCart size="1.3rem" color="white" />
                <span class="badge">10</span>
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
                    <NavDropdown.Item eventKey="4.1">Perfil</NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.2">
                      Mis pedidos
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.3">
                      Lista de deseos
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="4.4">
                      <LogOut />
                    </NavDropdown.Item>
                  </>
                ) : (
                  <NavDropdown.Item eventKey="4.4">
                    <Login />
                  </NavDropdown.Item>
                )}
              </NavDropdown>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="nav-dropdown">
                  <NavDropdown.Item as={Link} to="/admin" eventKey="4.1">Panel</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.2">Productos</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.3">Ordenes</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.4">Usuarios</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
