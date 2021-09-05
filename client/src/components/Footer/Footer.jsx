import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLocationArrow,
  FaPhoneSquareAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <Container fluid className="mt-5 ">
      <Row>
        <Col>
          <Row className="mb-4">
            <FaFacebook size="2rem" />
          </Row>
          <Row className="mb-4">
            <FaInstagram size="2rem" />
          </Row>
          <Row className="mb-4">
            <FaTwitter size="2rem" />
          </Row>
        </Col>
        <Col>
          <Row className="mb-4">
            <h4>Productos</h4>
          </Row>
          <Row className="mb-4">
            <h6>Ofertas</h6>
          </Row>
          <Row className="mb-4">
            <h6>Nuevos productos</h6>
          </Row>
          <Row className="mb-4">
            <h6>Lo más vendido</h6>
          </Row>
        </Col>
        <Col>
          <Row className="mb-4">
            <h4>Información</h4>
          </Row>

          <Row className="mb-4">
            <h6>Aviso de privacidad</h6>
          </Row>
          <Row className="mb-4">
            <h6>Términos y condiciones</h6>
          </Row>
          <Row className="mb-4">
            <h6>Preguntas frecuentes</h6>
          </Row>
        </Col>
        <Col>
          <Row className="mb-4">
            <h4>Contáctanos</h4>
          </Row>
          <Row className="mb-4">
            <Col xs={2}>
              <FaLocationArrow size="1.5rem" />
            </Col>
            <Col>
              <p>3448, La Rioja, Buenos Aires</p>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col xs={2}>
              <FaPhoneSquareAlt size="1.6rem" />
            </Col>
            <Col>
              <p>1142 52 4336</p>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col xs={2}>
              <FaEnvelope size="1.6rem" />
            </Col>
            <Col>
              <p>contacto@something.com</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
