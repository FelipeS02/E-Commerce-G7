import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  cleanFilters,
  getProducts,
  setFilters,
} from "../../actions/ProductActions";
import { Row, Col } from "react-bootstrap";
import SideBarFilter from "../SideBarFilter/SideBarFilter";
import PaginationC from "../Pagination/PaginationC";
import CardP from "../ProductCard/CardP";

const GenreResults = () => {
  const { genre = "all" } = useParams();
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.productsState);
  const { loading, error, products } = productsState;
  const productCategories = useSelector((state) => state.productCategories);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategories;
  const filterState = useSelector((state) => state.filterState);
  const { offset } = filterState;
  const { category, size, type } = filterState.filters;
  useEffect(() => {
    dispatch(setFilters({ name: "genre", value: genre }));
    dispatch(
      getProducts(
        "",
        category === "all" ? "" : category,
        type === "all" ? "" : type,
        size === "all" ? "" : size,
        genre === "all" ? "" : genre,
        offset
      )
    );
  }, [dispatch, offset, category, type, size, genre]);
  useEffect(() => {
    dispatch(cleanFilters());
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <PaginationC total={products.total} />
      <Row className="mx-3">
        <Col lg="2">
          {loadingCategories ? (
            <h1>Loading..</h1>
          ) : errorCategories ? (
            <h1>{errorCategories}</h1>
          ) : (
            <SideBarFilter />
          )}
        </Col>
        <Col>
          <Row>
            <h1>{products.length}Resultados</h1>
          </Row>
          <Row className="d-flex align-content-center flex-wrap justify-content-between">
            {error === "" && products.allClothes ? (
              products.allClothes.map((product, index) => (
                <CardP
                  key={index}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  picture={product.media[0].name}
                  sizes={product.sizes}
                />
              ))
            ) : (
              <h1>No se encontrarón resultados...</h1>
            )}
          </Row>
        </Col>
      </Row>
      <PaginationC total={products.total} />
    </>
  );
};

export default GenreResults;