let chai = require('chai');

chai.should();

describe('Foo', () => {
  let testObj;

  beforeEach(() => {
    testObj = { 'foo': 'bar' };
  });

  it('has property foo', () => {
    testObj.foo.should.equal('bar');
  });

  it('can be changed', () => {
    testObj.foo = 'baz';
    testObj.foo.should.equal('baz');
  });

});