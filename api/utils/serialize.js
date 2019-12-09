'use strict'

const _ = require('lodash')

const BLACKLIST = ['__v']
const CONVERTLIST = {
  _id: 'id',
}

module.exports = function factory (ADDITIONAL_KEYS = []) {
  return function serialize () {
    const keys = Object.keys(this._doc)
    const validKeys = _.difference(keys, [].concat(BLACKLIST, ADDITIONAL_KEYS))
    return validKeys.reduce((serializedObject, key) => {
      const newKey = CONVERTLIST[key] || key
      serializedObject[newKey] = this[key]
      return serializedObject
    }, {})
  }
}
