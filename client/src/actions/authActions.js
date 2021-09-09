import axios from "axios";

export const getAccessToken = (token) => {
  console.log("setting access token in header");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    axios.defaults.headers.common["Authorization"] = null;
  }
};

export const addingUserToDB = async (name, email) => {
  try {
    const { data } = await axios.post("/login", {
      name,
      email,
    });
    console.log(data);
  } catch (e) {
    console.log(e.message);
  }
};
