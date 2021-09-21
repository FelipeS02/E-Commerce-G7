import axios from "axios";

import {
  GET_ORDERS,
  ORDERS_FAIL,
  ORDER_STATE_UPDATE
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
export const orderStateUpdate = (id, state) => {
	return async function(dispatch){
		try{
			console.log(`aqui llego`)
			console.log(id)
			console.log(state)
			const orderState = await axios.get(`/admin/order-update/${id}?stateOrder=${state}`)
			console.log('ya volviiii')
			return dispatch({
				type: ORDER_STATE_UPDATE,
				payload: orderState.data
			})	
		}
		catch(error){
			return dispatch({
				type: ORDERS_FAIL,
				payload: error.data
			})
		}
	}
}

