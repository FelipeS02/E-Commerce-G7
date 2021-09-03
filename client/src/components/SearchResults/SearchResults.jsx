import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../actions/ProductActions";

const SearchResults = () => {
  const { name = "all" } = useParams();
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.productsState);
  const { loadingRequest, error, products } = productsState;
  useEffect(() => {
    dispatch(getProducts({ name: name !== "all" ? name : "" }));
  }, [dispatch, name]);
  return (
    <div>
      {loadingRequest ? (
        <h1>Loading..</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <h1>{products.length} Results</h1>
      )}
    </div>
  );
};

export default SearchResults;
