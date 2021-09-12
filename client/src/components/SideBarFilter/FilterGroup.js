import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";

const FilterGroup = (props) => {
  const { title, items } = props;
  const [active, setActive] = useState("");
  const toggleHandler = (e) => {
    setActive(e.target.id);
  };
  useEffect(() => {
    setActive("all");
  }, []);
  return (
    <>
      <h4 className="mt-5 mb-3">{title}</h4>
      <ListGroup as="ul" onClick={toggleHandler}>
        <ListGroup.Item
          key="all"
          as="li"
          id="all"
          className={active === "all" ? "active" : ""}
        >
          Todos
        </ListGroup.Item>
        {items?.map((item, index) => (
          <ListGroup.Item
            key={index}
            as="li"
            id={item}
            className={active === item ? "active" : ""}
          >
            {item}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default FilterGroup;
