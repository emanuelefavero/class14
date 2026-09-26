/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} title
 * @property {number} price
 * @property {string} description
 * @property {string} category
 * @property {string} image
 * @property {Object} rating
 * @property {number} rating.rate
 * @property {number} rating.count
 */

/**
 * @typedef {
 *   | { step: 'idle' }
 *   | { step: 'loading' }
 *   | { step: 'error', error: Error }
 *   | { step: 'success', data: Product[] }
 * } ProductsState
 */

/**
 * @typedef {
 *   | { step: 'idle' }
 *   | { step: 'loading' }
 *   | { step: 'error', error: Error }
 *   | {
 *       step: 'success',
 *       data: Product,
 *       prevProduct: Product | null,
 *       nextProduct: Product | null,
 *     }
 * } ProductState
 */
