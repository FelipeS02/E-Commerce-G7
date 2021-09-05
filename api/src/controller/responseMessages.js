const statusCode = (status) => {
  const codes = {
    success: 200,
    error: 400,
  };
  return codes[status] || 500;
};

const statusCodes = {
  SUCCESS: "success",
  ERROR: "error",
};

const responseMessage = (status, data) => {
  return {
    status,
    statusCode: statusCode(status),
    data,
  };
};

module.exports = {
  statusCode,
  statusCodes,
  responseMessage,
};
