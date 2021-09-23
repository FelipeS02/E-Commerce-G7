import {
  GET_ORDERS,
  ORDERS_FAIL,
  ORDER_STATE_UPDATE,
  ORDER_REVIEW
} from "../constants/ordersConstants.js";

const initialState = { orders: [] };

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload.orders.filter((e) => e.state !== "CARRITO"),
      };
    case ORDERS_FAIL:
      return {
        ...state,
        error: {
          message: "Fallo traer las ordenes",
        },
      };

    case ORDER_STATE_UPDATE:
      return {
        ...state,
        message: action.payload,
      };

    case ORDER_REVIEW:
      return {
        ...state
      };

    default:
      return state;
  }
}
