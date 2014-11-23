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

test('An invalid tag', function t(assert) {
  assert.plan(1);

  function invalidTagCreator() {
    return getDOMString(
      h('foo')
    );
  }

  assert.throws(invalidTagCreator, 'throws an error');
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

function getDOMString(reactDOM) {
  // Remove react id and checksum from resulting dom string
  return React.renderComponentToString(reactDOM)
    .replace(/\sdata-reactid=\".*?\"/g, '')
    .replace(/\sdata-react-checksum=\".*?\"/g, '');
}
