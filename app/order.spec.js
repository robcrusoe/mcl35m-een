const order = require('./order');
const expect = require('chai').expect;

describe('order', () => {
    it('should call the callback with a true value', (done) => {
        let cart = {};
        let success;
        let cb = (p1) => {
            success = p1;
            expect(success).to.be.true;
            done();
        }

        order(cart, cb);
    });
});