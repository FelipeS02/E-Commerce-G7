import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationC = () => {
  let active = 5;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <Pagination className="justify-content-center my-3"> {items}</Pagination>
  );
};

export default PaginationC;
