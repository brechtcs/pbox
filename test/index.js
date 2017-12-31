var fs = require('fs')
var path = require('path')
var pbox = require('../')
var test = require('tape')

test('yep', function (t) {
  var text = fs.readFileSync(path.join(__dirname, 'lorem.md'), 'utf-8')
  var parsed = pbox.parse(text)

  t.ok(parsed, 'text parser returns')
  t.equal(parsed.length, 2, 'two articles found')
  t.equal(parsed[0].title, 'First', 'first title')
  t.equal(parsed[1].title, 'Second', 'second title')

  t.end()
})
