import React from "react";
import { Form } from "react-bootstrap";
const Talle = () => {
  const size = ["XS", "S", "M", "L", "XL", "XXL"];
  return (
    <Form.Control as="select" aria-label="Default select example">
      <option>Talle</option>
      {size.map((item) => (
        <option value={item}>{item}</option>
      ))}
    </Form.Control>
  );
};

export default Talle;
