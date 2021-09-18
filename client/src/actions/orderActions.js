import axios from "axios";

import {
  GET_ORDERS,
  ORDERS_FAIL
} from "../constants/ordersConstants.js";

export const getOrders = (id,status) => async (dispatch) => {
  try {
    const  data = await axios.get(`/clothe/users-orders?userId=${id}&orderStatus=${status}`);
	console.log(data,'aca esta lo que estoy buscando');
    dispatch({
      type: GET_ORDERS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDERS_FAIL,
      payload: error.message,
    });
  }
};

