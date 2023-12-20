const sendError = function (res, code, message, error) {
  res.status(code).json({
    status: "fail",
    message,
    error,
  });
};

module.exports = sendError;
