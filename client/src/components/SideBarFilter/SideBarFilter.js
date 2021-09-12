import React, { useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import FilterGroup from "./FilterGroup";

const SideBarFilter = (props) => {
  const productCategories = useSelector((state) => state.productCategories);
  const { loading, categories } = productCategories;
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const genre = ["Masculino", "Femenino"];

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <FilterGroup title="Categorias" items={categories.categories} />
      <FilterGroup title="Tipos" items={categories.types} />
      <FilterGroup title="Talles" items={sizes} />
      <FilterGroup title="Genero" items={genre} />
    </>
  );
};

export default SideBarFilter;
