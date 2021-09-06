import React, { useState } from "react";
import {
  Card,
  Button,
  DropdownButton,
  Dropdown,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import AddToCar from "../AddToCar/AddToCar";

import Talle from "../Talle/Talle";
const CardP = (props) => {
  const { name, price, picture } = props;
  console.log(picture);
  return (
    <Card style={{ width: "20rem" }} className="my-4">
      <Card.Img variant="top" src={`${picture}`} />

      <Card.Body className="justify-content-center card text-center">
        <Card.Title>{name}</Card.Title>
        <Card.Text>${price}</Card.Text>

        <Talle />
      </Card.Body>
      <Card.Footer>
        <AddToCar />
      </Card.Footer>
    </Card>
  );
};

export default CardP;
