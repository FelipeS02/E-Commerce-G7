import {
  CATEGORY_FAIL,
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  CREATE_CLOTHE,
  PRODUCT_DETAIL,
  EDIT_CLOTHE,
  DELETE_CLOTHE
} from "../constants/productConstants";

const initialState = { loading: true, products: [], detail: {} };

export function productReducer(
  state = { loading: true, products: [], detail: {} },
  action
) {
  switch (action.type) {
    case PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.data,
      };
    case PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_CLOTHE:
      return {
        ...state
      };
    case DELETE_CLOTHE:
      return {
        ...state
      }
    case EDIT_CLOTHE:
    return {
      ...state
    }
    default:
      return state;
  }
}

export function categoryReducer(
  state = { loading: true, products: [], detail: {}},
  action
) {
  switch (action.type) {
    case CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.data,
      };
    case CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function detailReducer(state = { loading: true, products: [], detail: {} }, action){
  switch(action.type){
    case PRODUCT_DETAIL:
    return{
      ...state,
      loading: false,
      detail: action.payload
    }

    case PRODUCT_FAIL:
    return{
      ...state,
      loading: false,
      error: action.payload
    }

    default:
    return state
  }
}
