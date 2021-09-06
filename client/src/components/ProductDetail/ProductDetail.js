import React, { useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import AddToCar from "../AddToCar/AddToCar";
import Talle from "../Talle/Talle";
import { Carousel } from "react-bootstrap";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../actions/ProductActions";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch]);

  const productsStateDetail = useSelector(
    (state) => state.productsState.detail
  );
  const { name, price, detail, media } = productsStateDetail;
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Carousel fade>
            {media?.map((item) => (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={`http://localhost:3001/uploads/${item.name}`}
                  alt="First slide"
                  thumbnail
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col>
          <h1 className="my-5 text-center">Nombre del producto</h1>
          <h2 className="my-5 text-center">${price}</h2>
          <Row className="my-5">
            <h1>Descripción</h1>
            <p>{detail}</p>
          </Row>
          <Talle className="my-3" />
          <AddToCar className="my-3" />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
