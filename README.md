# react-hyperscript [![Build Status](https://travis-ci.org/mlmorg/react-hyperscript.png?branch=master)](https://travis-ci.org/mlmorg/react-hyperscript)

Hyperscript syntax for React.js markup.

## Usage

```js
var h = require('react-hyperscript');
var React = require('react');

var AnotherComponent = require('./another-component');

module.exports = React.createClass({
  render: function render() {
    return (
      h('div.example', [
        h('h1#heading', 'This is hyperscript'),
        h('h2', 'creating React.js markup'),
        h(AnotherComponent, {foo: 'bar'}, [
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

**If you're using React 0.11, use react-hyperscript 1.x.x. If you're using React
0.12 or React 0.13, use react-hyperscript 2.x.x.**

#### `h(componentOrTag, properties, children)`

Returns a React element.

- **componentOrTag** `Object|String` - Can be a React component **OR** tag
string with optional css class names/id in the format `h1#some-id.foo.bar`.
If a tag string, it will parse out the tag name and change the `id` and
`className` properties of the `properties` object.
- **properties** `Object` *(optional)* - An object containing the properties
you'd like to set on the element.
- **children** `Array|String` *(optional)* - An array of `h()` children or
a string. This will create child elements or a text node, respectively.
