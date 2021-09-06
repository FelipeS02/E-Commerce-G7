import React, { useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const SideBarFilter = (props) => {
  const productCategories = useSelector((state) => state.productCategories);
  // const productCategories = ["Camperas", "Remeras", "Jeans", "Camisas"];
  const { loading, categories } = productCategories;

  const [activeCategory, setActive] = useState("");

  const toggleHandler = (e) => {
    setActive(e.target.id);
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <ListGroup as="ul" onClick={toggleHandler}>
      {categories.map((category) => (
        <ListGroup.Item
          as="li"
          id={category.name}
          className={activeCategory === category.name ? "active" : ""}
        >
          {category.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default SideBarFilter;
