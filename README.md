# pbox

Parser for concatenated Jekyll posts

## Install

`npm install pbox`

## Usage

```js
var fs = require('fs')
var pbox = require('pbox')

var posts = fs.readFileSync('concat.md', 'utf-8')
var parsed = pbox.parse(posts)
```

Given the following input:

```md
---
title: First post
---

Some text.

---
title: Second post
---

First section.

---

Second section.
```

This will parse into an array with this structure:

```js
parsed = [
  {
    title: 'First post',
    content: ['\nSome text.\n']
  },
  {
    title: 'Second post',
    content: [
      '\nFirst section.\n',
      '\nSecond section.\n'
    ]
  }
]
```

## License

Apache-2.0
