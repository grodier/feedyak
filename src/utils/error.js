function CustomError(message, code) {
  const error = new Error(message);
  error.code = code;
  return error;
}

CustomError.prototype = Object.create(Error.prototype);

export default CustomError;
