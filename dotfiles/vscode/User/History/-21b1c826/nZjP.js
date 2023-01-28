describe('PDP', () => {
  before(() => {});

  describe('with an empty cart', () => {
    it('Can add a ring to cart', () => {
      cy.getCy('button-add-to-cart').click();
    });
  });
});
