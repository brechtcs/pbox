var assert = require('assert')
var yaml = require('js-yaml')

module.exports.parse = function (text, opts) {
  if (!opts) {
    opts = {}
  }
  assert.ok(!opts.props || (typeof opts.props === 'object' && !Array.isArray(opts.props)), '`props` should be an object')

  var pamphlets = text.split(/---\n/).reduce(function (list, val) {
    try {
      var part = yaml.safeLoad(val)

      if (typeof part === 'object') {
        part.content = []
        list.push(part)
      } else if (typeof part === 'string') {
        list[list.length - 1].content.push(part)
      }
    } catch (err) {
      if (err.name === 'YAMLException') {
        list[list.length - 1].content.push(val)
      } else {
        throw err
      }
    }
    return list
  }, [])

  return opts.props ? pamphlets.map(transformProps(opts.props)) : pamphlets
}

function transformProps (transforms) {
  return function (pamphlet, i) {
    var transformed = {}

    for (var prop in transforms) {
      if (typeof transforms[prop] === 'function') {
        transformed[prop] = transforms[prop](pamphlet[prop], i)
      } else {
        transformed[prop] = transforms[prop] === false ? undefined : pamphlet[prop]
      }
    }
    return transformed
  }
}
