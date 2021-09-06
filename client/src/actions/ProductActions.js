import Axios from "axios";
import {
  CATEGORY_FAIL,
  CATEGORY_REQUEST,
  CREATE_CLOTHE,
  CATEGORY_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
} from "../constants/productConstants";

export const getProducts =
  (name = "", category = "", offset = 0) =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_REQUEST,
    });
    try {
      let response;
      console.log("name", name);
      const { data } = await (name === ""
        ? Axios.get(
            `http://localhost:3001/clothe/all-clothes?limit=10&offset=${offset}`
          )
        : Axios.get(`http://localhost:3001/clothe?name=${name}`));
      response = data;

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
export function createClothe(form) {
  console.log(form);
  return async function (dispatch) {
    try {
      await Axios.post("http://localhost:3001/admin/create-clothe", form);
      return dispatch({
        type: CREATE_CLOTHE,
        payload: form,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
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
