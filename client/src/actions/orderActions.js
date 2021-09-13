import axios from "axios";

import {
  GET_ORDERS,
  ORDERS_FAIL
} from "../constants/ordersConstants.js";

export const getOrders = () => {
	return async function(dispatch){
		const orders = await axios.get("/clothe/users-orders?userId=&orderStatus=")
		return dispatch({
			type: GET_ORDERS,
			payload: orders.data
		})
	}
}

