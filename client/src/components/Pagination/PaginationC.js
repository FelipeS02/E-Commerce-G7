import React, {useState} from "react";
import { Pagination } from "react-bootstrap";

const PaginationC = ({ total }) => {
  let items = [];

  const [current, setCurrent] = useState(1);

  const validateCurrent = (value) => {
    let flag;
    value === current ? flag = true : flag = false
    return flag
  };

  const handleClick = (e) => {
    e.preventDefault();
    setCurrent(e.target.value);

  };

  for (let i = 1; i <= total; i++) {
    items.push(
      <Pagination.Item key={i} value={i} active={validateCurrent} onClick={handleClick}>
        {i}
      </Pagination.Item>
    );
  }
  return (
    <Pagination className="justify-content-center my-3">{items}</Pagination>
  );
};

export default PaginationC;
