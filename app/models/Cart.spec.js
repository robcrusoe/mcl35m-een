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

            /* Deep comparison ... */
            expect(cart.lineItems).to.eql([{ part: {}, quantity: 1 }]);
        });

        it('should have only one item with a quantity of two after addItem is called twice on a fresh cart with a quantity of 1', () => {
            cart.addItem(myPart, 1);
            cart.addItem(myPart, 1);

            expect(cart.lineItems).to.have.lengthOf(1);
            expect(cart.lineItems[0].quantity).to.eq(2);
        });

        it('should add quantities together when addItem is called', () => {
            cart.addItem(myPart, 2);
            cart.addItem(myPart, 4);

            expect(cart.lineItems).to.have.lengthOf(1);
            expect(cart.lineItems[0].quantity).to.eq(6);
        });

        it('should have two items if addItem is called with different parts', () => {
            let myPart2 = {};
            cart.addItem(myPart, 1);
            cart.addItem(myPart2, 1);

            expect(cart.lineItems).to.have.lengthOf(2);
        });

        it('should add quantity to their correct existing item', () => {
            let myPart2 = {};
            cart.addItem(myPart, 1);
            cart.addItem(myPart2, 1);

            cart.addItem(myPart, 3);

            expect(cart.lineItems).to.have.lengthOf(2);
            expect(cart.lineItems[0].quantity).to.eq(4);
        });
    });

    describe('getTotalCost', () => {
        let cart;
        beforeEach(() => {
            cart = new Cart();
        });

        it('should be zero with no items', () => {
            expect(cart.getTotalCost()).to.eq(0);
        });

        it('should be five with one item with a quantity of one and cost of five', () => {
            let myPart1 = { cost: 5 };
            cart.addItem(myPart1, 1);

            expect(cart.getTotalCost()).to.eq(5);
        });

        it('should be fifteen with one item of quantity one with cost of five and one more item with quantity one with cost of ten', () => {
            let myPart1 = { cost: 5 };
            let myPart2 = { cost: 10 };

            cart.addItem(myPart1, 1);
            cart.addItem(myPart2, 1);

            expect(cart.getTotalCost()).to.eq(15);
        });

        describe('getTotalCost variations', () => {
            let partCost5 = { cost: 5 };
            let partCost10 = { cost: 10 };

            let emptyLineItems = [];
            let singleItemLineItems = [
                { part: partCost5, quantity: 1 }
            ];
            let multipleItemsLineItems = [
                { part: partCost5, quantity: 1 },
                { part: partCost10, quantity: 1 }
            ];

            let testVariations = [
                { lineItems: emptyLineItems, expected: 0 },
                { lineItems: singleItemLineItems, expected: 5 },
                { lineItems: multipleItemsLineItems, expected: 15 }
            ];

            testVariations.forEach(test => {
                it(`correctly calculates the total cost with ${test.lineItems.length} items`, () => {
                    cart.lineItems = test.lineItems;

                    expect(cart.getTotalCost()).to.eq(test.expected);
                });
            });
        });
    });

    describe('empty', () => {
        let cart;
        beforeEach(() => {
            cart = new Cart();
        });

        it('should have an empty array', () => {
            cart.lineItems = [{}, {}];
            cart.empty();

            /* `Identity comparison` doesn't work good for us here ... */
            // expect(cart.lineItems).to.eq([]);

            /* We have to go with the option of `Deep comparison` here ... */
            expect(cart.lineItems).to.eql([]);
        });

        it('should have a different object when emptied than the original array', () => {
            let originalLineItems = cart.lineItems;

            /* Testing Identity (even though the shapes are same - both empty arrays) */
            cart.empty();
            expect(cart.lineItems).to.not.eq(originalLineItems);
        });
    });
});