var yaml = require('js-yaml')

module.exports.parse = function (text) {
  return text.split(/---\n/).reduce(function (list, val) {
    var part = yaml.safeLoad(val)

    if (typeof part === 'object') {
      part.content = []
      list.push(part)
    } else if (typeof part === 'string') {
      list[list.length - 1].content.push(part)
    }
    return list
  }, [])
}
