import React, { useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const SideBarFilter = (props) => {
  // const productCategories = useSelector((state) => state.productCategories);
  const productCategories = ["Camperas", "Remeras", "Jeans", "Camisas"];
  const [activeCategory, setActive] = useState("");

  const toggleHandler = (e) => {
    setActive(e.target.id);
  };
  
  return (
    <ListGroup as="ul" onClick={toggleHandler}>
      {productCategories.map((category) => (
        <ListGroup.Item
          as="li"
          id={category}
          className={activeCategory === category ? "active" : ""}
        >
          {category}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default SideBarFilter;
