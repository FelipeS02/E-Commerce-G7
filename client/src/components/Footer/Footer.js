import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLocationArrow,
  FaPhoneSquareAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const [t, i18n] = useTranslation("global");
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
            <h4>{t("Footer.Productos")}</h4>
          </Row>
          <Row className="mb-4">
            <h6>{t("Footer.Ofertas")}</h6>
          </Row>
          <Row className="mb-4">
            <h6>{t("Footer.Nuevos-Productos")}</h6>
          </Row>
          <Row className="mb-4">
            <h6>{t("Footer.Mas-Vendido")}</h6>
          </Row>
        </Col>
        <Col>
          <Row className="mb-4">
            <h4>{t("Footer.Informacion")}</h4>
          </Row>

          <Row className="mb-4">
            <h6>{t("Footer.Privacidad")}</h6>
          </Row>
          <Row className="mb-4">
            <h6>{t("Footer.TyC")}</h6>
          </Row>
          <Row className="mb-4">
            <h6>{t("Footer.Preguntas-F")}</h6>
          </Row>
        </Col>
        <Col>
          <Row className="mb-4">
            <h4>{t("Footer.Contactanos")}</h4>
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
