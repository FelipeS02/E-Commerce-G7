import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../../actions/ProductActions";
import { Row, Col } from "react-bootstrap";
import SideBarFilter from "../SideBarFilter/SideBarFilter";
import PaginationC from "../Pagination/PaginationC";

const SearchResults = () => {
  const { name = "all", category = "all" } = useParams();
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.productsState);
  const { loading, error, products } = productsState;
  const productCategories = useSelector((state) => state.productCategories);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategories;

  useEffect(() => {
    let param = name !== "all" ? name : "";
    dispatch(getProducts(param));
  }, [dispatch, name, category]);

  return (
    <div>
      {loading ? (
        <h1>Loading..</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <PaginationC total={products.total} />
          <Row className="mx-3">
            <Col lg="2">
              <h4>Categorías:</h4>
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
              <Row>mapear los resultados aqui</Row>
            </Col>
          </Row>
          <PaginationC total={products.total} />
        </>
      )}
    </div>
  );
};

export default SearchResults;
