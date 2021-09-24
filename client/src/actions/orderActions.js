import axios from "axios";
import { Form } from "react-bootstrap";
import {
  GET_ORDERS,
  ORDERS_FAIL,
  ORDER_STATE_UPDATE,
  GET_ALL_ORDERS,
  ORDER_REVIEW,
} from "../constants/ordersConstants.js";

export const getAllOrders = () => {
  return async function (dispatch) {
    const orders = await axios.get("/clothe/users-orders?userId=&orderStatus=");
    return dispatch({
      type: GET_ALL_ORDERS,
      payload: orders.data,
    });
  };
};
export const orderStateUpdate = (id, state) => {
  return async function (dispatch) {
    try {
      const orderState = await axios.get(
        `/admin/order-update/${id}?stateOrder=${state}`
      );
      return dispatch({
        type: ORDER_STATE_UPDATE,
        payload: orderState.data,
      });
    } catch (error) {
      return dispatch({
        type: ORDERS_FAIL,
        payload: error.data,
      });
    }
  };
};
export const getOrders = (id, status) => async (dispatch) => {
  try {
    const data = await axios.get(
      `/clothe/users-orders?userId=${id}&orderStatus=${status}`
    );
    const newData = {
      orders: data.data.data[0].orders.filter((e) => e.state !== "CARRITO"),
      reviews: data.data.data[0].reviews
    }
    dispatch({
      type: GET_ORDERS,
      payload: newData,
    });
  } catch (error) {
    dispatch({
      type: ORDERS_FAIL,
      payload: error.message,
    });
  }
};

export const reviewUser = (form) => async (dispatch) => {
  try {
    await axios.post(`/clothe/clothe-review`, form);
    dispatch({
      type: ORDER_REVIEW,
      payload: form,
    });
  } catch (error) {
    console.log(error);
  }
};
