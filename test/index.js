var React = require('react');
var test = require('tape');
var h = require('../');

function getDOMString(reactDOM) {
  // Create component
  var ComponentClass = React.createClass({
    render: function render() {
      return reactDOM;
    }
  });

  // Render component to string
  var componentFactory = React.createFactory(ComponentClass);
  return React.renderToStaticMarkup(componentFactory());
}

test('Creating an html tag', function t(assert) {
  assert.plan(1);

  var dom = getDOMString(
    h('h1')
  );

  assert.equal(dom, '<h1></h1>', 'renders a standalone tag');
  assert.end();
});

test('Creating an invalid tag', function t(assert) {
  assert.plan(1);

  function invalidTagCreator() {
    return getDOMString(
      h('foo')
    );
  }

  assert.throws(invalidTagCreator, 'throws an error');
  assert.end();
});

test('Creating a tag with an id and classes in the tag name', function t(assert) {
  assert.plan(1);

  var dom = getDOMString(
    h('h1#boom.whatever.foo')
  );

  assert.equal(dom, '<h1 id="boom" class="whatever foo"></h1>', 'renders a tag with the correct id and class attributes');
  assert.end();
});

test('Creating a tag with classes in the tag name and in properties', function t(assert) {
  assert.plan(1);

  var dom = getDOMString(
    h('h1.foo', {className: 'bar'})
  );

  assert.equal(dom, '<h1 class="foo bar"></h1>', 'renders both classes on the tag');
  assert.end();
});

test('Creating a tag with other properties', function t(assert) {
  assert.plan(1);

  var dom = getDOMString(
    h('a', {href: 'http://www.google.com'})
  );

  assert.equal(dom, '<a href="http://www.google.com"></a>', 'renders the attributes correctly');
  assert.end();
});

test('Creating a tag with a string as the third argument', function t(assert) {
  assert.plan(1);

  var dom = getDOMString(
    h('h1', null, 'Hello World!')
  );

  assert.equal(dom, '<h1>Hello World!</h1>', 'renders a text node within the element');
  assert.end();
});

test('Creating a tag with a string as the second argument', function t(assert) {
  assert.plan(1);

  var dom = getDOMString(
    h('h1', 'Hello World!')
  );

  assert.equal(dom, '<h1>Hello World!</h1>', 'renders a text node within the element');
  assert.end();
});

test('Creating a tag with a children array as the third argument', function t(assert) {
  assert.plan(1);

  var dom = getDOMString(
    h('h1', null, [
      h('span'),
      h('span')
    ])
  );

  assert.equal(dom, '<h1><span></span><span></span></h1>', 'renders the children correctly');
  assert.end();
});

test('Creating a tag with a children array as the second argument', function t(assert) {
  assert.plan(1);

  var dom = getDOMString(
    h('h1', [
      h('span'),
      h('span')
    ])
  );

  assert.equal(dom, '<h1><span></span><span></span></h1>', 'renders the children correctly');
  assert.end();
});
