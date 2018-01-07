var yaml = require('js-yaml')

module.exports.parse = function (text) {
  return text.split(/---\n/).reduce(function (list, val) {
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
}
