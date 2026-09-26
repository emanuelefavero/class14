export const index = (req, res) => {
  throw new Error('This is a test error');
};

export const unavailable = (req, res, next) => {
  const error = new Error('This is a service unavailable test error');
  error.status = 503;

  return next(error);
};
