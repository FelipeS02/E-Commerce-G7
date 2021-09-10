import { combineReducers } from "redux";
import { productReducer, categoryReducer } from "./ProductReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  productsState: productReducer,
  productCategories: categoryReducer,
  userState: authReducer,
});

export default rootReducer;
