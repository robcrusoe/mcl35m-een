const Cart = require('./Cart');
const expect = require('chai').expect;

describe('Cart', () => {
    let cart, myPart;
    beforeEach(() => {
        cart = new Cart();
        myPart = {};
    });

    describe('addItem', () => {
        it('should have only one item with a quantity of one after addItem is called on a fresh cart with a quantity of 1', () => {
            cart.addItem(myPart, 1);
            expect(cart.lineItems.length).to.eq(1);
            expect(cart.lineItems[0].quantity).to.eq(1);
        });

        it('should have only one item with a quantity of two after addItem is called twice on a fresh cart with a quantity of 1', () => {
            cart.addItem(myPart, 1);
            cart.addItem(myPart, 1);

            expect(cart.lineItems).to.have.lengthOf(1);
            expect(cart.lineItems[0].quantity).to.eq(2);
        });
    });
});