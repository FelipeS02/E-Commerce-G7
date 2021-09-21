import axios from "axios";
import {
  GET_ORDERS,
  ORDERS_FAIL,
  ORDER_STATE_UPDATE
} from "../constants/ordersConstants.js";

export const getAllOrders = () => {
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
			const orderState = await axios.get(`/admin/order-update/${id}?stateOrder=${state}`)
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
export const getOrders = (id,status) => async (dispatch) => {
  try {
    const data = await axios.get(`/clothe/users-orders?userId=${id}&orderStatus=${status}`);
	console.log(data.data.data[0],'aca esta lo que estoy buscando');
    dispatch({
      type: GET_ORDERS,
      payload: data.data.data[0],
    });
  } catch (error) {
    dispatch({
      type: ORDERS_FAIL,
      payload: error.message,
    });
  }
};
