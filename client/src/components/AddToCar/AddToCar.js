import React, { useState } from "react";
import { Row, Button, Col, Form } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
const AddToCar = () => {
  const [itemNumber, setItemNumber] = useState("1");
  const itemHandler = (e) => {
    setItemNumber(e.target.value);
  };
  return (
    <Row className="my-5">
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
  );
};

export default AddToCar;
