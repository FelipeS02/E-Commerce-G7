import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import AddToCar from "../AddToCar/AddToCar";
import Talle from "../Talle/Talle";
import { Carousel } from "react-bootstrap";

const ProductDetail = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Carousel fade>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://chilangoskate.com/shop/23922-large_default/playera-creature-space-logo.jpg"
                alt="First slide"
                thumbnail
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://chilangoskate.com/shop/23920-large_default/playera-creature-space-logo.jpg"
                alt="Second slide"
                thumbnail
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://chilangoskate.com/shop/23921-large_default/playera-creature-space-logo.jpg"
                alt="Third slide"
                thumbnail
              />
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col>
          <h1 className="my-5">Nombre del producto</h1>
          <h2 className="my-2">$00000</h2>
          <Talle className="my-3" />
          <AddToCar className="my-3" />
        </Col>
      </Row>
      <Row className="my-2">
        <h1 className="text-center">Descripción</h1>
        <p>Descripcion del producto va aqui</p>
      </Row>
    </Container>
  );
};

export default ProductDetail;
