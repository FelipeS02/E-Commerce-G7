import axios from "axios";
import { GET_CART_SUCCESS } from "../constants/productConstants";
export const addToCart = (obj, id, userId) => async (dispatch) => {
  try {
    const { data } = await axios.put("/clothe/order-add", {
      data: {
        size: obj.size,
        quantity: obj.quantity,
        clotheId: id,
        userId: userId,
      },
    });
    if (data.statusCode !== 200) {
      throw new Error(`${data.data}`);
    }

    return dispatch(getOrder(userId, "CARRITO"));
  } catch (err) {
    console.log(err);
  }
};

export const removeFromCart = (obj, orderId, userId) => async (dispatch) => {
  try {
    const { data } = await axios.put("/clothe/order-delete ", {
      data: {
        orderId: orderId,
        size: obj.quantity_and_size.size,
        clotheId: obj.id,
      },
    });
    if (data.statusCode !== 200) {
      throw new Error(`${data.data}`);
    }

    return dispatch(getOrder(userId, "CARRITO"));
  } catch (err) {
    console.log(err);
  }
};
export const getOrder = (userId, status) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/clothe/users-orders?userId=${userId}&orderStatus=${status}`
    );
    console.log("get order function", data.data[0].orders[0]);

    return dispatch({
      type: GET_CART_SUCCESS,
      payload: data.data[0].orders[0],
    });
  } catch (err) {
    console.log(err);
  }
};
