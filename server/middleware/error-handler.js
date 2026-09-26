import { STATUS_CODES } from 'node:http';

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  const errorStatus = err.status ?? err.statusCode;
  const status =
    Number.isInteger(errorStatus) && errorStatus >= 400 && errorStatus <= 599
      ? errorStatus
      : 500;

  const message =
    status >= 500
      ? STATUS_CODES[status] || 'Internal Server Error'
      : err.message || STATUS_CODES[status] || 'Unknown Error';

  if (status >= 500) console.error(err);

  return res.status(status).json({ message });
};
