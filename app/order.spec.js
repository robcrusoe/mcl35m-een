const order = require('./order');
const expect = require('chai').expect;

describe('order', () => {
    it('should deal with promises', () => {
        let cart = {};
        
        return order(cart).then(total => {
            expect(total).to.eq(500);
        });
    });
});