# react-hyperscript [![Build Status](https://travis-ci.org/mlmorg/react-hyperscript.png?branch=master)](https://travis-ci.org/mlmorg/react-hyperscript)

Hyperscript syntax for React.js markup.

## Usage

```js
var h = require('react-hyperscript');
var React = require('react');

module.exports = React.createClass({
  render: function render() {
    return (
      h('div.example', [
        h('h1#heading', 'This is hyperscript'),
        h('h2', 'creating React.js markup'),
        h('ul', [
          h('li', [
            h('a', {href: 'http://whatever.com'}, 'One list item')
          ]),
          h('li', 'Another list item')
        ])
      ])
    );
  }
});
```

## Documentation

#### `h(selector, properties, children)`

Returns a React.DOM element.

- **selector** `String` - Takes a tag name and optional class names or id in the
format `h1#some-id.foo.bar`. It will parse out the tag name and change the `id`
and `className` properties of the `properties` object.
- **properties** `Object` *(optional)* - An object containing the properties
you'd like the set on the React.DOM element.
- **children** `Array` or `String` *(optional)* - An array of `h()` children or
a string. This will create child elements or a text node, respectively.
