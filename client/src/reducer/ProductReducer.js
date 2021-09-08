import {
  CATEGORY_FAIL,
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  FILTER_PRODUCTS_BY_CATEGORY,
  CREATE_CLOTHE,
  PRODUCT_DETAIL,
} from "../constants/productConstants";

const initialState = {
  loading: true,
  products: [],
  name: "",
  price: "",
  detail: "",
  media: "",
  sizes: [],
};

export function productReducer(
  state = {
    loading: true,
    products: [],
    name: "",
    price: "",
    detail: "",
    media: "",
    sizes: [],
  },
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
        error: false,
      };
    case PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PRODUCT_DETAIL:
      return {
        ...state,
        loading: false,
        detail: action.payload,
      };
    case FILTER_PRODUCTS_BY_CATEGORY:
      return {
        ...state,

        filteredProducts: action.payload.products,
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

export function categoryReducer(
  state = { loading: true, products: [] },
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
        categories: action.payload.data.categories,
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
