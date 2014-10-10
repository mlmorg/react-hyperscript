var parseTag = require('virtual-hyperscript/parse-tag');
var React = require('react');

function isChildren(x) {
  return typeof x === 'string' || Array.isArray(x);
}

function h(selector, properties, children) {
  // If a child array or text node are passed as the second argument, shift them
  if (!children && isChildren(properties)) {
    children = properties;
    properties = {};
  }

  // Parse the tag name and fill out the properties
  properties = properties || {};
  var tagName = parseTag(selector, properties);

  // Throw an error if the tag is invalid
  var reactDOMCreator = React.DOM[tagName];
  if (!reactDOMCreator) {
    throw new Error('React does not support the `'+tagName+'` tag');
  }

  // Call React.DOM
  var args = [properties].concat(children);
  return reactDOMCreator.apply(React.DOM, args);
}

module.exports = h;
