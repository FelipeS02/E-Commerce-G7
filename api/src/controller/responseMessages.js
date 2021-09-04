const statusCode = (status) => {
  const codes = {
    success: 200,
    error: 400,
  };
  return codes[status] || 500;
};

export const statusCodes = {
  SUCCESS: "success",
  ERROR: "error",
};

export const responseMessage = (status, data) => {
  return {
    status,
    statusCode: statusCode(status),
    data,
  };
};

// front


// try {
//   const getAxios = await axios.get("asdasdsa");
//   const resData = res.data.data;

//   if (getAxios.statusCode === 200 && getAxios.status === "success") {
//     dispatch({
//       type: "asd",
//       payload: resData.data,
//     });
//   } else if (getAxios.statusCode === 400) {
//   }
// } catch (e) {
//   dispatch({
//     type: "error",
//     payload: resData,
//   });
// }
