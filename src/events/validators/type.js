const isUndefined = require('lodash/fp/isUndefined');
const isNil = require('lodash/fp/isNil');

/**
 * Validates the type of event
 *
 * @param {string}  type - before or after.
 * @returns {mixed}      - Can be string or undefined or even null.
 * @throws {error}
 */
const validateType = (type) => {
  if (!isUndefined(type) && !isNil(type)) {
    if (type !== 'before' && type !== 'after') {
      throw Error('Type must be either before or after');
    }
  }

  return type;
}

module.exports = validateType
