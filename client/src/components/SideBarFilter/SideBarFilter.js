import React from "react";
import { useSelector } from "react-redux";
import FilterGroup from "./FilterGroup";

const SideBarFilter = (props) => {
  const productCategories = useSelector((state) => state.productCategories);
  const filterState = useSelector((state) => state.filterState);
  const { category, size, type, genre, offset, current } = filterState.filters;

  const { loading, categories } = productCategories;
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const genres = ["Masculino", "Femenino"];

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <FilterGroup
        title="Categorias"
        type="category"
        items={categories.categories}
        active={category}
      />
      <FilterGroup
        title="Tipos"
        type="type"
        items={categories.types}
        active={type}
      />
      <FilterGroup title="Talles" type="size" items={sizes} active={size} />
      <FilterGroup title="Genero" type="genre" items={genres} active={genre} />
    </>
  );
};

export default SideBarFilter;
