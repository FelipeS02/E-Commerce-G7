export const PRODUCT_REQUEST = "PRODUCT_REQUEST";
export const PRODUCT_SUCCESS = "PRODUCT_SUCCESS";
export const PRODUCT_FAIL = "PRODUCT_FAIL";
export const CREATE_CLOTHE = "CREATE_CLOTHE";

export const CATEGORY_REQUEST = "CATEGORY_REQUEST";
export const CATEGORY_SUCCESS = "CATEGORY_SUCCESS";
export const CATEGORY_FAIL = "CATEGORY_FAIL";

export const FILTER_PRODUCTS_BY_CATEGORY = "FILTER_PRODUCTS_BY_CATEGORY";
export const PRODUCT_DETAIL = "PRODUCT_DETAIL";

export const USER_INFO_FAIL = "USER_INFO_FAIL";
export const USER_INFO_SUCCESS = "USER_INFO_SUCCESS";
export const USER_LOGOUT = "USER_LOGOUT";

export const GET_CART_FAIL = "GET_CART_FAIL";
export const GET_CART_SUCCESS = "GET_CART_SUCCESS";
export const GET_CART_LOADING = "GET_CART_LOADING";

export const BASE_IMG_URL =
  process.env.NODE_ENV === "production"
    ? "https://e-commerce-api-g7.herokuapp.com"
    : "http://localhost:3001";
