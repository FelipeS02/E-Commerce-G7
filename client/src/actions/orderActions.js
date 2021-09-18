import axios from "axios";

import {
  GET_ORDERS,
  ORDERS_FAIL,
  ORDER_DETAIL,
  ORDER_MODIFIED
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

export const orderDetail = (id) => {
	return async function(dispatch){
		const detail = await axios.get(`/clothe/order-detail/${id}`)
		return dispatch({
			type: ORDER_DETAIL,
			payload: detail.data
		})
	}
}

export const orderModified = (orderId, orderState, arrayClothes) => {
	return async function(dispatch){
		const detail = await axios.post("/clothe/order-edit", {data:{orderId: orderId, arrayClothes: arrayClothes}})
		const state = await axios.post(`/admin/order-update/${orderId}?state=${orderState}`)

		return dispatch({
			type: ORDER_MODIFIED,
			payload: {
				detail,
				state
			}
		})
	}
}
