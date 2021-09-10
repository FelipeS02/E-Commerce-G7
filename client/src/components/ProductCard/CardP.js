import React, { useState } from "react";
import { Card } from "react-bootstrap";
import AddToCar from "../AddToCar/AddToCar";
import Talle from "../Talle/Talle";

const CardP = (props) => {
  const { name, price, picture, sizes } = props;
  const [userSelected, setUserSelected] = useState({
    talle: "",
    quantity: 0,
    maxValue: 0,
  });

  const addToCardHandler = () => {
    console.log("adding to car");
  };

  const talleHandler = (index) => {
    if (!sizes[index]) {
      return setUserSelected((prevState) => {
        return {
          ...prevState,
          talle: "",
          maxValue: 0,
          quantity: 0,
        };
      });
    }
    setUserSelected((prevState) => {
      return {
        ...prevState,
        talle: sizes[index].size,
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
    <Card style={{ width: "20rem" }} className="my-4">
      <Card.Img variant="top" src={`/${picture}`} />

      <Card.Body className="justify-content-center card text-center">
        <Card.Title>{name}</Card.Title>
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
