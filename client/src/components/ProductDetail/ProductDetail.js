import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import AddToCar from "../AddToCar/AddToCar";
import Talle from "../Talle/Talle";
import { Carousel } from "react-bootstrap";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../actions/ProductActions";
import { BASE_IMG_URL } from "../../constants/productConstants";
import { addToCart } from "../../actions/cartAccions";
import ShowReview from "../Review/ShowReviews";

const ProductDetail = () => {
  const { id } = useParams();
  const [userSelected, setUserSelected] = useState({
    size: "",
    quantity: 0,
    maxValue: 0,
  });
  const userInfo = useSelector((state) => state.userState.userInfo);
  const addToCardHandler = () => {
    dispatch(addToCart(userSelected, id, userInfo.id));
  };

  const talleHandler = (index) => {
    if (!sizes[index]) {
      return setUserSelected((prevState) => {
        return {
          ...prevState,
          size: "",
          maxValue: 0,
          quantity: 0,
        };
      });
    }
    setUserSelected((prevState) => {
      return {
        ...prevState,
        size: sizes[index].size,
        maxValue: sizes[index].stock,
        quantity:
          prevState.maxValue > sizes[index].stock ? sizes[index].stock : "1",
      };
    });
  };
  const itemHandler = (value) => {
    setUserSelected((prevState) => {
      return {
        ...prevState,
        quantity: value,
      };
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  const detailState = useSelector((state) => state.detailState);
  const { loading } = detailState;
  if (loading) {
    return <div>Loading..</div>;
  }
  const { name, price, detail, media, sizes } = detailState.detail;

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Carousel fade>
            {media?.map((item) => (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={`${BASE_IMG_URL}/uploads/${item.name}`}
                  alt="First slide"
                  thumbnail
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col>
          <h1 className="my-5 text-center">{name}</h1>
          <h2 className="my-5 text-center">${price}</h2>
          <Row className="my-5">
            <h1>Descripción</h1>
            <p>{detail}</p>
          </Row>
          <Talle sizes={sizes} talleHandler={talleHandler} />
          <AddToCar
            addToCardHandler={addToCardHandler}
            maxValue={userSelected.maxValue}
            itemHandler={itemHandler}
            quantity={userSelected.quantity}
          />
          <ShowReview clotheId={id}/>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
