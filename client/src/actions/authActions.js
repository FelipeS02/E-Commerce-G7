import axios from "axios";
import {
  USER_LOGOUT,
  USER_INFO_FAIL,
  USER_INFO_SUCCESS,
  USER_LOGIN,
} from "../constants/productConstants";

export const getAccessToken = (token) => {
  console.log("setting access token in header");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    axios.defaults.headers.common["Authorization"] = null;
  }
};

export const addingUserToDB = (name, email) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN,
  });
  try {
    const { data } = await axios.post("/login", {
      name,
      email,
    });
    console.log(data);
    if (data.statusCode !== 200) {
      return dispatch({
        type: USER_INFO_FAIL,
        payload: data.data.message,
      });
    }
    return dispatch({
      type: USER_INFO_SUCCESS,
      payload: data.data.userData,
    });
  } catch (e) {
    return dispatch({
      type: USER_INFO_FAIL,
      payload: e.message,
    });
  }
};

export const removingUserInfo = () => (dispatch) => {
  return dispatch({
    type: USER_LOGOUT,
  });
};
