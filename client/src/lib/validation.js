const isRecord = (value) =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * @typedef {
 *   | null
 *   | 'string'
 *   | 'number'
 *   | 'boolean'
 *   | [Schema]
 *   | Record<string, Schema>
 * } Schema
 */

/**
 * Validates whether the given data matches the provided schema
 *
 * @param {unknown} data
 * @param {Schema} schema
 * @returns {boolean}
 * @example
 * matchesSchema({ age: 30 }, { age: 'number' }); // true
 * matchesSchema([1, 2], ['string']); // false
 */
export const matchesSchema = (data, schema) => {
  // Null
  if (schema === null) return data === null;

  // Primitive
  if (schema === 'string' || schema === 'number' || schema === 'boolean')
    return typeof data === schema;

  // Array
  if (Array.isArray(schema)) {
    if (schema.length !== 1 || !Array.isArray(data)) return false;

    const [itemSchema] = schema;

    return data.every((item) => matchesSchema(item, itemSchema));
  }

  // Object
  if (!isRecord(schema) || !isRecord(data)) return false;

  return Object.entries(schema).every(([key, value]) => {
    if (!Object.hasOwn(data, key)) return false;

    return matchesSchema(data[key], value);
  });
};
