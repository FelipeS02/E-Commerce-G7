import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts } from "../../actions/ProductActions";
const SideBarFilter = (props) => {
  const dispatch = useDispatch();
  const productCategories = useSelector((state) => state.productCategories);
  const products = useSelector((state) => state.productsState.products);

  const { loading, categories } = productCategories;

  const [activeCategory, setActive] = useState("all");

  const toggleHandler = (e) => {
    setActive(e.target.id);
  };
  useEffect(() => {
    dispatch(filterProducts(products, activeCategory));
  }, [dispatch, products, activeCategory]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <ListGroup as="ul" onClick={toggleHandler}>
      <ListGroup.Item
        as="li"
        id="all"
        className={activeCategory === "all" ? "active" : ""}
      >
        Todas las categorías
      </ListGroup.Item>
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
