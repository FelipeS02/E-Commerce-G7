import React from "react";
import { useSelector } from "react-redux";
import FilterGroup from "./FilterGroup";
import { useTranslation } from "react-i18next";

const SideBarFilter = (props) => {
  const { disabledGenre } = props;
  const productCategories = useSelector((state) => state.productCategories);
  const filterState = useSelector((state) => state.filterState);
  const { category, size, type, genre, offset, current } = filterState.filters;
  const [t, i18n] = useTranslation("global");

  const { loading, categories } = productCategories;
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const genres = ["Masculino", "Femenino"];

  if (loading) {
    return <div>{t("Loading.Loading")}</div>;
  }
  return (
    <>
      <FilterGroup
        title={t("SideBarFilter.Categorias")}
        type="category"
        items={categories.categories}
        active={category}
      />
      <FilterGroup
        title={t("SideBarFilter.Tipos")}
        type="type"
        items={categories.types}
        active={type}
      />
      <FilterGroup
        title={t("SideBarFilter.Talles")}
        type="size"
        items={sizes}
        active={size}
      />
      <FilterGroup
        className="disabled"
        title={t("SideBarFilter.Genero")}
        type="genre"
        items={genres}
        active={genre}
        disabledGenre={disabledGenre}
      />
    </>
  );
};

export default SideBarFilter;
