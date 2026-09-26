import axios from 'axios';

/**
 * @param {string} url
 * @param {Object} [params]
 * @returns {Promise<unknown>}
 * @example
 * fetchData(url, { page: 1 })
 */
export const fetchData = (url, params = {}) =>
  axios.get(url, { params }).then(({ data }) => data);
