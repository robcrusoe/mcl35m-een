const expect = require('chai').expect;
const should = require('chai').should();
const assert = require('chai').assert;

describe('Parts', () => {
  describe('add method', () => {
    it('should implement some tests with chai', () => {
      const result = true;

      /* `expect` syntax */
      expect(result).to.be.true;

      /* `should` syntax */
      result.should.be.true;

      /* `assert` syntax */
      assert.isTrue(result);
    });

    it('should add a part to the parts list', () => {
      // ...
    });

    it('should not add duplicate parts to the parts list', () => {
      // ...
    });
  });
});