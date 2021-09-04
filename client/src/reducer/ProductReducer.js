import {
  PRODUCT_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  CREATE_CLOTHE
} from "../constants/productConstants";

const initialState = { 
  products: []
};

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
    case CREATE_CLOTHE:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
}

export default productReducer;
