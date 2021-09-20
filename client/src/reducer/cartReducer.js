import {
  GET_CART_FAIL,
  GET_CART_SUCCESS,
  GET_CART_LOADING,
  PAYMENT_SUCCESS,
} from "../constants/productConstants";
const initialState = {
  carItems: {},
  totalItems: 0,
  carTotalAmount: 0,
  paymentSuccess: false,
};
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART_SUCCESS: {
      return {
        ...state,
        totalItems: action.payload.clothes.length,
        carTotalAmount: action.payload.total,
        carItems: action.payload.clothes,
        orderId: action.payload.id,
        error: false,
        loading: false,
        paymentSuccess: false,
      };
    }
    case PAYMENT_SUCCESS: {
      return {
        ...state,
        carItems: {},
        totalItems: 0,
        carTotalAmount: 0,
        paymentSuccess: true,
      };
    }
    default:
      return state;
  }
}

export default cartReducer;
