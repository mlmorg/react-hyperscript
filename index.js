'use strict';
var parseTag = require('virtual-hyperscript/parse-tag');
var React = require('react');

module.exports = h;

function h(componentOrTag, properties, children) {
  var slice = 2;
  properties = properties || {};

  // Allow for omitting the properties object
  if (isChildren(properties)) {
    children = properties;
    properties = {};
    slice = 1;
  }

  // Allow passing children as arguments instead of as an array
  if (!Array.isArray(children)) {
    children = Array.prototype.slice.call(arguments, slice);
  }

  // When a selector, parse the tag name and fill out the properties object
  if (typeof componentOrTag === 'string') {
    componentOrTag = parseTag(componentOrTag, properties);
  }

  // Create the element
  var args = [componentOrTag, properties].concat(children);
  return React.createElement.apply(React, args);
}

function isChildren(x) {
  return typeof x === 'string' || React.isValidElement(x) || Array.isArray(x);
}
