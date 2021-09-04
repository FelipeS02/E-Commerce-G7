import {
  PRODUCT_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
} from "../constants/productConstants";

const initialState = { products: [] };

function productReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_REQUEST:
      return {
        ...state,
        loadingRequest: true,
      };
    case PRODUCT_SUCCESS:
      return {
        ...state,
        loadingRequest: false,
        products: action.payload,
      };
    case PRODUCT_FAIL:
      return {
        ...state,
        loadingRequest: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default productReducer;
