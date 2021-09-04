import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <Container>
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
          <h4>Contáctanos</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
