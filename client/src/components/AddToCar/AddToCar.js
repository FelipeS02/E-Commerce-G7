import React, { useState } from "react";
import { Row, Button, Col, Form } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
const AddToCar = (props) => {
  const { maxValue, itemHandler, quantity, addToCardHandler } = props;

  return (
    <Row>
      <Col xs={4}>
        <Form.Control
          type="number"
          min="0"
          max={maxValue}
          value={quantity}
          onChange={(e) => itemHandler(e.target.value)}
        />
      </Col>
      <Col xs={8}>
        <Button
          variant="primary"
          className={maxValue === 0 ? "disabled" : ""}
          onClick={(e) => {
            addToCardHandler(e.target.value);
          }}
        >
          <FaShoppingCart /> Agregar al carrito
        </Button>
      </Col>
    </Row>
  );
};

export default AddToCar;
