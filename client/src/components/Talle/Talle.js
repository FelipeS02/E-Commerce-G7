import React from "react";
import { Form } from "react-bootstrap";
const Talle = (props) => {
  const { size } = props;
  return (
    <Form.Control as="select" aria-label="Default select example">
      <option>Talle</option>
      {size?.map((item) => (
        <option value={item.size}>{item.size}</option>
      ))}
    </Form.Control>
  );
};

export default Talle;
