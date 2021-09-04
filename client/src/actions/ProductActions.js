import axios from "axios";
import Axios from "axios";
import {
  PRODUCT_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  CREATE_CLOTHE
} from "../constants/productConstants";

export const getProducts =
  (name = "") =>
  async (dispatch) => {
    console.log("something");
    dispatch({
      type: PRODUCT_REQUEST,
    });
    try {
      const { data } = await (name === ""
        ? Axios.get(`http://localhost:3000/clothesByName/${name}`)
        : Axios.get("http://localhost:3000/clothesByName/allClothe"));
      dispatch({
        type: PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_FAIL,
        payload: error.message,
      });
    }
  };

  export  function createClothe(form){
    console.log(form);
    return async function(dispatch){
      try {
        await axios.post('http://localhost:3001/admin/create-clothe', form);
        return dispatch({
            type: CREATE_CLOTHE,
            payload: form
        });
      } catch (error) {
        console.log(error)
      }

    }
}