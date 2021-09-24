import React from "react";
import { Form } from "react-bootstrap";
import "./Talle.css";
import { useTranslation } from "react-i18next";
const Talle = (props) => {
  const { sizes, talleHandler } = props;
  const [t, i18n] = useTranslation("global");
  return (
    <Form.Control
      as="select"
      onChange={(e) => {
        talleHandler(e.target.value);
      }}
    >
      <option>{t("Talle.Talle")}</option>
      {sizes?.map((item, index) => (
        <option key={index} value={index}>
          {item.size}
        </option>
      ))}
    </Form.Control>
  );
};

export default Talle;
