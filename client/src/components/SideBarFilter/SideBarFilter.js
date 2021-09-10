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
      {categories.categories.map((category, index) => (
        <ListGroup.Item
          key={index}
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
