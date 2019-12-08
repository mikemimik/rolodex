'use strict'

const _ = require('lodash')

const BLACKLIST = ['_id', '__v']

module.exports = function factory (ADDITIONAL_KEYS = []) {
  return function serialize () {
    const keys = Object.keys(this)
    const validKeys = _.difference(keys, [].concat(BLACKLIST, ADDITIONAL_KEYS))
    return validKeys.reduce((serializedObject, key) => {
      serializedObject[key] = this[key]
      return serializedObject
    }, {})
  }
}
