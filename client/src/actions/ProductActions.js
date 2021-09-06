import Axios from "axios";
import {
  CATEGORY_FAIL,
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
} from "../constants/productConstants";

export const getProducts =
  (name = "", category = "") =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_REQUEST,
    });
    try {
      let response;
      if (category !== "") {
        const { data } = await Axios.get(
          `http://localhost:3000/filterByCategory`
        );
        response = data;
      } else {
        const { data } = await (name === ""
          ? Axios.get(`http://localhost:3000/clothesByName/${name}`)
          : Axios.get("http://localhost:3001/clothe/all-clothes"));
        response = data;
      }

      dispatch({
        type: PRODUCT_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_FAIL,
        payload: error.message,
      });
    }
  };

export const getCategories = () => async (dispatch) => {
  dispatch({
    type: CATEGORY_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      "http://localhost:3001/clothe/all-categories"
    );
    dispatch({
      type: CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_FAIL,
      payload: error.message,
    });
  }
};
