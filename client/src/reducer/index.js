import { combineReducers } from "redux";
import { productReducer, categoryReducer } from "./ProductReducer";

const rootReducer = combineReducers({
  productsState: productReducer,
  productCategories: categoryReducer,
});

export default rootReducer;
