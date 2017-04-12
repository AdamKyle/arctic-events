const isObject = require('lodash/fp/isObject');
const isUndefined = require('lodash/fp/isUndefined');

/**
 * Validates the use option of event
 *
 * @param {mixed} use - Object or undefined or false
 * @returns {mixed}   - Can be undefined or object or false.
 * @throws {error}
 */
const validateUse = (use) => {
  if (!isUndefined(use)) {
    if (!isObject(use) && use !== false) {
      throw Error('The use option must be false or an object.');
    }
  }

  return use;
}

module.exports = validateUse;
