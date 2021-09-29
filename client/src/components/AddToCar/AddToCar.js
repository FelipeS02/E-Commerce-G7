import React, { useState } from "react";
import { Row, Button, Col, Form } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useTranslation } from "react-i18next";
const AddToCar = (props) => {
  const { maxValue, itemHandler, quantity, addToCardHandler, isSizeSelected } =
    props;
  const [t, i18n] = useTranslation("global");
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
          <FaShoppingCart />{" "}
          {maxValue === 0 && isSizeSelected
            ? "Producto no disponible"
            : t("Carrito.Agregar")}
        </Button>
      </Col>
    </Row>
  );
};

export default AddToCar;
