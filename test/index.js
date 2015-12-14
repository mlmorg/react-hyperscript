'use strict';
var React = require('react');
var test = require('tape');
var h = require('../');

test('An html tag', function t(assert) {
  assert.plan(1);

  var dom = getDOMString(
    h('h1')
  );

  assert.equal(dom, '<h1></h1>', 'renders a standalone tag');
  assert.end();
});

test('A tag with an id and classes in the selector', function t(assert) {
  assert.plan(1);

  var dom = getDOMString(
    h('h1#boom.whatever.foo')
  );

  assert.equal(dom, '<h1 id="boom" class="whatever foo"></h1>',
    'renders a tag with the correct id and class attributes');
  assert.end();
});

test('A tag with classes in the selector and props', function t(assert) {
  assert.plan(1);

  var dom = getDOMString(
    h('h1.foo', {className: 'bar'})
  );

  assert.equal(dom, '<h1 class="foo bar"></h1>',
    'renders both classes on the tag');
  assert.end();
});

test('A tag with other properties', function t(assert) {
  assert.plan(1);

  var dom = getDOMString(
    h('a', {href: 'http://www.google.com'})
  );

  assert.equal(dom, '<a href="http://www.google.com"></a>',
    'renders the attributes correctly');
  assert.end();
});

test('A tag with a string as the third argument', function t(assert) {
  assert.plan(1);

  var dom = getDOMString(
    h('h1', null, 'Hello World!')
  );

  assert.equal(dom, '<h1>Hello World!</h1>',
    'renders a text node within the element');
  assert.end();
});

test('A tag with a string as the second argument', function t(assert) {
  assert.plan(1);

  var dom = getDOMString(
    h('h1', 'Hello World!')
  );

  assert.equal(dom, '<h1>Hello World!</h1>',
    'renders a text node within the element');
  assert.end();
});

test('A tag with a number as the second argument', function t(assert) {
  assert.plan(1);

  var dom = getDOMString(
    h('h1', 5)
  );

  assert.equal(dom, '<h1>5</h1>',
    'renders a text node with a number within the element');
  assert.end();
});

test('A tag with a number as the third argument', function t(assert) {
  assert.plan(1);

  var dom = getDOMString(
    h('h1', null, 5)
  );

  assert.equal(dom, '<h1>5</h1>',
    'renders a text node with a number within the element');
  assert.end();
});

test('A tag with a `0` as the second argument', function t(assert) {
  assert.plan(1);

  var dom = getDOMString(
    h('h1', 0)
  );

  assert.equal(dom, '<h1>0</h1>',
    'renders a text node with a 0 within the element');
  assert.end();
});

test('A tag with a children array as the third argument', function t(assert) {
  assert.plan(1);

  var dom = getDOMString(
    h('h1', null, [
      h('span'),
      h('span')
    ])
  );

  assert.equal(dom, '<h1><span></span><span></span></h1>',
    'renders the children correctly');
  assert.end();
});

test('A tag with a children array as the second argument', function t(assert) {
  assert.plan(1);

  var dom = getDOMString(
    h('h1', [
      h('span'),
      h('span')
    ])
  );

  assert.equal(dom, '<h1><span></span><span></span></h1>',
    'renders the children correctly');
  assert.end();
});

test('A component', function t(assert) {
  assert.plan(1);

  var dom = renderTestComponent();

  assert.equal(dom, '<div><h1></h1></div>',
    'renders the component correctly');
  assert.end();
});

test('A component with props and children', function t(assert) {
  assert.plan(1);

  var dom = renderTestComponent({title: 'Hello World!'}, [
    h('span', 'A child')
  ]);

  assert.equal(dom, '<div><h1>Hello World!</h1><span>A child</span></div>',
    'renders the component with children and props correctly');
  assert.end();
});

test('A component with children', function t(assert) {
  assert.plan(1);

  var dom = renderTestComponent([
    h('span', 'A child')
  ]);

  assert.equal(dom, '<div><h1></h1><span>A child</span></div>',
    'renders the component with children correctly');
  assert.end();
});

function renderTestComponent() {
  // Create a test component
  var Component = React.createClass({
    render: function render() {
      return (
        h('div', [
          h('h1', this.props.title),
          this.props.children
        ])
      );
    }
  });

  // Render it with the passed args
  var args = Array.prototype.slice.call(arguments);
  args.unshift(Component);
  var component = h.apply(h, args);
  return getDOMString(component);
}

function getDOMString(reactElement) {
  return React.renderToStaticMarkup(reactElement);
}
