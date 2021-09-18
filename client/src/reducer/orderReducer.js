import{
  GET_ORDERS,
  ORDERS_FAIL,
  ORDER_DETAIL,
  ORDER_MODIFIED
} from "../constants/ordersConstants.js";

const initialState = { orders: [], orderDetail: {} };

export default function orderReducer(state = initialState, action){
	switch(action.type){

		case GET_ORDERS:
		return {
			...state,
			orders: action.payload
		}
		case ORDERS_FAIL:
		return {
			...state,
			error: {
				message: "Fallo traer las ordenes"
			}
		}
		case ORDER_DETAIL:
		return {
			...state,
			orderDetail: action.payload
		}
		case ORDER_MODIFIED:
		return {
			...state,
			orderDetail: action.payload
		}
		default:
		return state;
	}
}