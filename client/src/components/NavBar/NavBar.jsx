import React from "react";
import Login from "../Login/Login";
import LogOut from "../Login/LogOut";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  NavDropdown,
} from "react-bootstrap";
import { FaUser, FaShoppingCart } from "react-icons/fa";

import { useAuth0 } from "@auth0/auth0-react";
const NavBar = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Logo</Navbar.Brand>
          <Nav className="justify-content-center">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
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
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
