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
import { Link } from "react-router-dom";
import AddToCar from "../AddToCar/AddToCar";

import Talle from "../Talle/Talle";
const CardP = (props) => {
  const { name, price, picture, id } = props;

  return (
    <Card style={{ width: "20rem" }} className="my-4">
      <Card.Img
        variant="top"
        src={`http://localhost:3001/uploads/${picture}`}
      />

      <Card.Body className="justify-content-center card text-center">
        <Card.Title as={Link} to={`search/details/${id}`}>
          {name}
        </Card.Title>
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
