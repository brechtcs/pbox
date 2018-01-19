var fs = require('fs')
var path = require('path')
var pbox = require('../')
var test = require('tape')

var lorem = fs.readFileSync(path.join(__dirname, 'lorem.md'), 'utf-8')

test('basic parser', function (t) {
  var parsed = pbox.parse(lorem)

  t.plan(7)
  t.ok(parsed, 'parser returns')
  t.equal(parsed.length, 2, 'two articles found')
  t.equal(parsed[0].title, 'First', 'first title')
  t.equal(parsed[1].title, 'Second', 'second title')

  parsed.forEach(function (post, i) {
    post.content.forEach(function (section, j) {
      t.ok(section, `section ${j + 1} of post ${i + 1}`)
    })
  })
})

test('sort pamphlets', function (t) {
  function sort (a, b) {
    return a.title > b.title ? -1 : b.title > a.title ? 1 : 0
  }

  var parsed = pbox.parse(lorem, {sort})
  t.ok(parsed, 'parser returns')
  t.equal(parsed[0].title, 'Second', 'first title')
  t.equal(parsed[1].title, 'First', 'second title')
  t.end()
})

test('transform properties', function (t) {
  var props = {
    title: (title, i) => `${i + 1}. ${title}`,
    content: (content) => content.join('\n---')
  }

  var parsed = pbox.parse(lorem, {props})
  t.ok(parsed, 'parser returns')
  t.equal(parsed[0].title, '1. First', 'first transformed title')
  t.equal(parsed[1].title, '2. Second', 'second transformed title')
  t.equal(typeof parsed[1].content, 'string', 'second content joined')
  t.end()
})

test('set & drop properties', function (t) {
  var props = {
    title: undefined,
    val: 'value'
  }

  var parsed = pbox.parse(lorem, {props})
  t.ok(parsed, 'parser returns')
  t.equal(parsed[0].author, 'Someone', 'keep first author')
  t.equal(parsed[0].val, 'value', 'set first value')
  t.equal(parsed[0].title, undefined, 'drop first title')
  t.equal(parsed[1].val, 'value', 'set second value')
  t.equal(parsed[1].title, undefined, 'drop second title')
  t.end()
})
