import { combineReducers } from "redux";
import { productReducer, categoryReducer, detailReducer } from "./ProductReducer";
import orderReducer from "./orderReducer.js";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
const rootReducer = combineReducers({
  productsState: productReducer,
  detailState: detailReducer,
  productCategories: categoryReducer,
  userState: authReducer,
  orderState: orderReducer,
  cartState: cartReducer,
});

export default rootReducer;
