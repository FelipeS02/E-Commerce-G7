import React, { useState } from "react";
import { Card } from "react-bootstrap";
import AddToCar from "../AddToCar/AddToCar";
import Talle from "../Talle/Talle";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cartAccions";
import { BASE_IMG_URL } from "../../constants/productConstants";
import { Link } from "react-router-dom";

const CardP = (props) => {
  const dispatch = useDispatch();
  const { id, name, price, picture, sizes } = props;
  const [userSelected, setUserSelected] = useState({
    size: "",
    quantity: 0,
    maxValue: 0,
  });
  const userInfo = useSelector((state) => state.userState.userInfo);
  const addToCardHandler = () => {
    dispatch(addToCart(userSelected, id, userInfo.id, props));
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
  return (
    <Card
      style={{
        width: "20rem",
        boxShadow: "0px 0px 6px 2px rgba(0, 0, 0, 0.5)",
      }}
      className="my-4"
    >
      <Card.Img variant="top" src={`${BASE_IMG_URL}/uploads/${picture}`} />

      <Card.Body className="justify-content-center card text-center">
        <Card.Title as={Link} to={`/search/details/${id}`}>
          {name}
        </Card.Title>
        <Card.Text>${price}</Card.Text>

        <Talle sizes={sizes} talleHandler={talleHandler} />
      </Card.Body>
      <Card.Footer>
        <AddToCar
          addToCardHandler={addToCardHandler}
          maxValue={userSelected.maxValue}
          itemHandler={itemHandler}
          quantity={userSelected.quantity}
        />
      </Card.Footer>
    </Card>
  );
};

export default CardP;
