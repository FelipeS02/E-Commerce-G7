import { combineReducers } from "redux";
import { productReducer, categoryReducer } from "./ProductReducer";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
const rootReducer = combineReducers({
  productsState: productReducer,
  productCategories: categoryReducer,
  userState: authReducer,
  cartState: cartReducer,
});

export default rootReducer;
