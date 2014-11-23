'use strict';
var parseTag = require('virtual-hyperscript/parse-tag');
var React = require('react');

module.exports = h;

function h(componentOrTag, properties, children) {
  properties = properties || {};

  // If a child array or text node are passed as the second argument, shift them
  if (!children && isChildren(properties)) {
    children = properties;
    properties = {};
  }

  if (typeof componentOrTag === 'string') {
    componentOrTag = getTagFn(componentOrTag, properties);
  }

  // Call React.DOM
  var args = [properties].concat(children);
  return componentOrTag.apply(React.DOM, args);
}

function getTagFn(tag, properties) {
  // Parse the tag name and fill out the properties
  var tagName = parseTag(tag, properties);

  // Throw an error if the tag is invalid
  var tagFn = React.DOM[tagName];
  if (!tagFn) {
    throw new Error('React does not support the `' + tagName + '` tag');
  }

  return tagFn;
}

function isChildren(x) {
  return typeof x === 'string' || Array.isArray(x);
}
