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
import { FaShoppingCart } from "react-icons/fa";
const CardP = (props) => {
  const size = ["XS", "S", "M", "L", "XL", "XXL"];
  const [itemNumber, setItemNumber] = useState("1");
  const itemHandler = (e) => {
    setItemNumber(e.target.value);
  };
  return (
    <Card style={{ width: "20rem" }}>
      <Card.Img
        variant="top"
        src="https://chilangoskate.com/shop/17858-large_default/sudadera-vans-x-se-bikes.jpg"
      />

      <Card.Body className="justify-content-cente card text-center">
        <Card.Title>Card Title</Card.Title>
        <Card.Text>$000000</Card.Text>
        <DropdownButton id="dropdown-basic-button" title="Talle">
          {size.map((item, index) => (
            <Dropdown.Item href="#/action-3">{item}</Dropdown.Item>
          ))}
        </DropdownButton>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col xs={3}>
            <Form.Control
              type="number"
              value={itemNumber}
              onChange={itemHandler}
            />
          </Col>
          <Col xs={9}>
            <Button variant="primary">
              <FaShoppingCart /> Agregar al carrito
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default CardP;
