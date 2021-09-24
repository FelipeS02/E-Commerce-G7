import axios from "axios";
import {
  USER_LOGOUT,
  USER_INFO_FAIL,
  USER_INFO_SUCCESS,
  USER_LOGIN,
  GET_USERS,
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

export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/login");
    console.log(data);
    if (data.statusCode !== 200) {
      return dispatch({
        type: USER_INFO_FAIL,
        payload: data.data.message,
      });
    }
    return dispatch({
      type: GET_USERS,
      payload: data.data.allUserData,
    });
  } catch (e) {
    return dispatch({
      type: USER_INFO_FAIL,
      payload: e.message,
    });
  }
};

export const userSetAdmin = (id, email, set) => async (dispatch) => {
  try {
    if (set === "addAdmin") {
      const { data } = await axios.get(
        `/admin/users-control/assign-role/${email}`
      );
      console.log(data.data.message);
      // await axios.get(`/admin/set-admin/${id}?role=${set}`)
      if (data.statusCode !== 200) {
        return dispatch({
          type: USER_INFO_FAIL,
          payload: data.data.message,
        });
      }
      return dispatch({
        type: GET_USERS,
        payload: data.data.allUserData,
      });
    } else if (set === "removeAdmin") {
      const { data } = await axios.get(
        `/admin/users-control/remove-role/${email}`
      );
      await axios.get(`/admin/set-admin/${id}?role=${set}`);
      if (data.statusCode !== 200) {
        return dispatch({
          type: USER_INFO_FAIL,
          payload: data.data.message,
        });
      }
      return dispatch({
        type: GET_USERS,
        payload: data.data.allUserData,
      });
    } else if (set === "resetPassword") {
      const { data } = await axios.get(
        `/admin/users-control/reset-password/${email}`
      );
      if (data.statusCode !== 200) {
        return dispatch({
          type: USER_INFO_FAIL,
          payload: data.data.message,
        });
      }
      return dispatch({
        type: GET_USERS,
        payload: data.data.allUserData,
      });
    }
  } catch (e) {
    return dispatch({
      type: USER_INFO_FAIL,
      payload: e.message,
    });
  }
};
