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
    <Card style={{ width: "20rem" }} className="my-4">
      <Card.Img
        variant="top"
        src="https://chilangoskate.com/shop/17858-large_default/sudadera-vans-x-se-bikes.jpg"
      />

      <Card.Body className="justify-content-center card text-center">
        <Card.Title>Card Title</Card.Title>
        <Card.Text>$000000</Card.Text>

        <Form.Control as="select" aria-label="Default select example">
          <option>Talle</option>
          {size.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </Form.Control>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col xs={3}>
            <Form.Control
              type="number"
              min="1"
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
