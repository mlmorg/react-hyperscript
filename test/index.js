'use strict';
var console = require('console');
var React = require('react');
var ReactDOM = require('react-dom/server');
var test = require('tape');

var h = require('../');

var Component = createComponent();

var renderTests = {
  'basic html tag': {
    dom: h('h1'),
    html: '<h1></h1>'
  },
  'tag with an id and classes in selector': {
    dom: h('h1#boom.whatever.foo'),
    html: '<h1 id="boom" class="whatever foo"></h1>'
  },
  'tag with an id and classes in selector and props': {
    dom: h('h1.foo', {className: 'bar'}),
    html: '<h1 class="foo bar"></h1>'
  },
  'tag with other properties': {
    dom: h('a', {href: 'http://www.google.com'}),
    html: '<a href="http://www.google.com"></a>'
  },
  'tag with string as third argument': {
    dom: h('h1', null, 'Hello World!'),
    html: '<h1>Hello World!</h1>'
  },
  'tag with string as second argument': {
    dom: h('h1', 'Hello World!'),
    html: '<h1>Hello World!</h1>'
  },
  'tag with number as second argument': {
    dom: h('h1', 5),
    html: '<h1>5</h1>'
  },
  'tag with number as third argument': {
    dom: h('h1', null, 5),
    html: '<h1>5</h1>'
  },
  'tag with `0` as second argument': {
    dom: h('h1', 0),
    html: '<h1>0</h1>'
  },
  'tag with children array as third argument': {
    dom: h('h1', null, [
      h('span'),
      h('span')
    ]),
    html: '<h1><span></span><span></span></h1>'
  },
  'tag with children array as second argument': {
    dom: h('h1', [
      h('span'),
      h('span')
    ]),
    html: '<h1><span></span><span></span></h1>'
  },
  'tag with nested dataset': {
    dom: h('div', {dataset: {foo: 'bar', bar: 'oops'}}),
    html: '<div data-foo="bar" data-bar="oops"></div>'
  },
  'tag with nested attributes': {
    dom: h('div', {attributes: {title: 'foo'}}),
    html: '<div title="foo"></div>'
  },
  'basic component': {
    dom: h(Component),
    html: '<div><h1></h1></div>'
  },
  'component with props and children': {
    dom: h(Component, {title: 'Hello World!'}, [
      h('span', 'A child')
    ]),
    html: '<div><h1>Hello World!</h1><span>A child</span></div>'
  },
  'component with children': {
    dom: h(Component, [
      h('span', 'A child')
    ]),
    html: '<div><h1></h1><span>A child</span></div>'
  },
  'component with children in props': {
    dom: h(Component, {children: [h('span', 'A child')]}),
    html: '<div><h1></h1><span>A child</span></div>'
  }
};

test('Tags rendered with different arguments', function t(assert) {
  Object.keys(renderTests).forEach(function runRenderTest(name) {
    var dom;
    var data = renderTests[name];
    var messages = catchWarns(function makeDomString() {
      dom = getDOMString(data.dom);
    });

    assert.equal(messages.length, 0,
      '`' + name + '` does not log warnings');

    assert.equal(dom, data.html,
      '`' + name + '` renders correctly');
  });
  assert.end();
});

function createComponent() {
  return React.createClass({
    render: function render() {
      return (
        h('div', [
          h('h1', this.props.title),
          this.props.children
        ])
      );
    }
  });
}

function getDOMString(reactElement) {
  return ReactDOM.renderToStaticMarkup(reactElement);
}

function catchWarns(fn) {
  var messages = [];

  /* eslint-disable no-console */
  var originalWarn = console.warn;
  console.warn = warn;
  fn();
  console.warn = originalWarn;
  /* esline-enable no-console */

  return messages;

  function warn(message) {
    messages.push(message);
  }
}
