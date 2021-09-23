import {
  USER_INFO_FAIL,
  USER_INFO_SUCCESS,
  USER_LOGOUT,
  USER_LOGIN,
  GET_USERS
} from "../constants/productConstants";
const initialState = {
  allUsers: null,
  userInfo: {},
  loginUserInfo: false,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return{
        ...state,
        allUsers: action.payload
      }
    case USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        error: false,
        loginUserInfo: false,
      };
    case USER_INFO_FAIL:
      return {
        ...state,
        userInfo: {},
        error: action.paload,
        loginUserInfo: false,
      };
    case USER_LOGOUT:
      return {
        ...state,
        userInfo: {},
        error: false,
        loginUserInfo: false,
      };
    case USER_LOGIN:
      return {
        ...state,
        loginUserInfo: true,
      };
    default:
      return state;
  }
}

export default authReducer;
