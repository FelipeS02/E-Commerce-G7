import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  cleanFilters,
  getProducts,
  setFilters,
  setCurrentPage,
} from "../../actions/ProductActions";
import { Row, Col, Container } from "react-bootstrap";
import SideBarFilter from "../SideBarFilter/SideBarFilter";
import PaginationC from "../Pagination/PaginationC";
import CardP from "../ProductCard/CardP";
import { useTranslation } from "react-i18next";
import Loading from "../Loading/Loading";

const GenreResults = () => {
  const [t, i18n] = useTranslation("global");
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
    dispatch(cleanFilters());
    dispatch(setCurrentPage({ current: 1 }));
  }, [dispatch]);
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

  return (
    <>
      <PaginationC total={products.total} />
      <Row className="mx-3">
        <Col lg="2">
          {loadingCategories ? (
            <Loading />
          ) : errorCategories ? (
            <h1>{errorCategories}</h1>
          ) : (
            <SideBarFilter disabledGenre="true" />
          )}
        </Col>
        {loading ? (
          <Loading />
        ) : (
          <Col>
            <Row>
              <h1>
                {products.length}
                {t("Results.Resultados")}
              </h1>
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
                  <h1>{t("Results.Sin-Resultados")}</h1>
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

export default GenreResults;
