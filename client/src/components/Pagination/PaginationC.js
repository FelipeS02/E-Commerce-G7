import React from "react";
import { Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../actions/ProductActions";

const PaginationC = () => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.productsState);
  const { products } = productsState;
  const { current } = useSelector((state) => state.filterState);
  const { total } = products;

  let recipesPerPage = 10;
  let totalPaginate = Math.ceil(total / recipesPerPage);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(
      setCurrentPage({ current: parseInt(e.target.text), offset: e.target.id })
    );
  };

  let items = [];
  let currentOffset = 0;
  for (let i = 1; i <= totalPaginate; i++) {
    items.push(
      <Pagination.Item
        key={i}
        id={currentOffset}
        className={i === current ? "active" : ""}
      >
        {i}
      </Pagination.Item>
    );
    currentOffset += 10;
  }

  return (
    <Pagination
      onClick={(e) => {
        handleClick(e);
      }}
      className="justify-content-center my-3"
    >
      {items}
    </Pagination>
  );
};

export default PaginationC;
