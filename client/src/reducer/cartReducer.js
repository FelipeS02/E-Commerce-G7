import {
  GET_CART_FAIL,
  GET_CART_SUCCESS,
  GET_CART_LOADING,
} from "../constants/productConstants";
const initialState = {
  carItems: {},
  totalItems: 0,
  carTotalAmount: 0,
};
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART_SUCCESS: {
      return {
        ...state,
        totalItems: action.payload.clothes.length,
        carTotalAmount: action.payload.total,
        carItems: action.payload.clothes,
        error: false,
        loading: false,
      };
    }
    default:
      return state;
  }
}

export default cartReducer;
