import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./ProductReducer";

const rootReducer = combineReducers({
  productsState: productReducer,
});

export default rootReducer;
