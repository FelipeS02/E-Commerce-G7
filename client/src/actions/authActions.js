import axios from "axios";
export const authorized = (token) => {
  console.log(token);
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    axios.defaults.headers.common["Authorization"] = null;
    /*if setting null does not remove `Authorization` header then try     
          delete axios.defaults.headers.common['Authorization'];
        */
  }
};
