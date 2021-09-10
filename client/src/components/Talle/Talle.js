import React from "react";
import { Form } from "react-bootstrap";
const Talle = (props) => {
  const { sizes, talleHandler } = props;
  return (
    <Form.Control
      as="select"
      onChange={(e) => {
        talleHandler(e.target.value);
      }}
    >
      <option>Talle</option>
      {sizes?.map((item, index) => (
        <option key={index} value={index}>
          {item.size}
        </option>
      ))}
    </Form.Control>
  );
};

export default Talle;
