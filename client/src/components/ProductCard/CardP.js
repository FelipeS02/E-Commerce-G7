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
  return (
    <Card style={{ width: "20rem" }} className="my-4">
      <Card.Img
        variant="top"
        src="https://chilangoskate.com/shop/17858-large_default/sudadera-vans-x-se-bikes.jpg"
      />

      <Card.Body className="justify-content-center card text-center">
        <Card.Title>Card Title</Card.Title>
        <Card.Text>$000000</Card.Text>

        <Talle />
      </Card.Body>
      <Card.Footer>
        <AddToCar />
      </Card.Footer>
    </Card>
  );
};

export default CardP;
