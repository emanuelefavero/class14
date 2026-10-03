import axios from 'axios';

/** Returns the response body from a GET request; feature hooks validate its shape before exposing it to pages. */
export const fetchData = (url, params = {}) =>
  axios.get(url, { params }).then(({ data }) => data);

export const postData = (url, payload, config = {}) =>
  axios.post(url, payload, config).then(({ data }) => data);
