var fs = require('fs')
var path = require('path')
var pbox = require('../')
var test = require('tape')

test('yep', function (t) {
  var text = fs.readFileSync(path.join(__dirname, 'lorem.md'), 'utf-8')
  var parsed = pbox.parse(text)

  t.plan(7)
  t.ok(parsed, 'text parser returns')
  t.equal(parsed.length, 2, 'two articles found')
  t.equal(parsed[0].title, 'First', 'first title')
  t.equal(parsed[1].title, 'Second', 'second title')

  parsed.forEach(function (post, i) {
    post.content.forEach(function (section, j) {
      t.ok(section, `section ${j + 1} of post ${i + 1}`)
    })
  })
})
