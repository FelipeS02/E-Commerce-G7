import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getProducts } from "../../actions/ProductActions";

const PaginationC = ({ total }) => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);

  let recipesPerPage = 10;
  let totalPaginate = Math.ceil(total / recipesPerPage);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("target id", e.target.text);
    const newCurrent = parseInt(e.target.text);
    setCurrent(newCurrent);
    console.log(current);
    dispatch(getProducts("", "", e.target.id));
  };

  let items = [];
  let currentOffset = 0;
  for (let i = 1; i <= totalPaginate; i++) {
    items.push(
      <Pagination.Item
        key={i}
        id={currentOffset}
        className={i === current ? "active" : ""}
        onClick={handleClick}
      >
        {i}
      </Pagination.Item>
    );
    currentOffset += 10;
  }

  return (
    <Pagination className="justify-content-center my-3">{items}</Pagination>
  );
};

export default PaginationC;
