import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanFilters, getProducts } from "../../actions/ProductActions";
import { Row, Col, Container } from "react-bootstrap";
import SideBarFilter from "../SideBarFilter/SideBarFilter";
import PaginationC from "../Pagination/PaginationC";
import CardP from "../ProductCard/CardP";
import Loading from "../Loading/Loading";

const SearchResults = () => {
  const { name = "all" } = useParams();
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
  const { category, size, type, genre } = filterState.filters;
  useEffect(() => {
    dispatch(
      getProducts(
        name === "all" ? "" : name,
        category === "all" ? "" : category,
        type === "all" ? "" : type,
        size === "all" ? "" : size,
        genre === "all" ? "" : genre,
        offset
      )
    );
  }, [dispatch, name, offset, category, type, size, genre]);
  useEffect(() => {
    dispatch(cleanFilters());
  }, [dispatch]);

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
        {loading ? (
          <Loading />
        ) : (
          <Col>
            <Row>
              <h1>{products.length}Resultados</h1>
            </Row>
            <Container className="d-flex justify-content-center align-items-center ">
              <Row>
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
            </Container>
          </Col>
        )}
      </Row>
      <PaginationC total={products.total} />
    </>
  );
};

export default SearchResults;
