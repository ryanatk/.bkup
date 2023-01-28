describe('PDP add to cart button', () => {
  before(() => {});

  describe('with an empty cart', () => {
    it('Can add a ring to cart', () => {
      cy.visitWithFlags(
        '/product/heritage-silver',
        [
          {
            key: 'extended-warranty',
            enabled: false,
          },
          {
            key: 'membership-price-test',
            enabled: false,
          },
        ],
        state,
      );
      cy.getCy('button-add-to-cart').click();
    });
  });
});
