import { stubThirdPartyRoutes } from '../../utils/utils';
import USAppState from '../../../fixtures/testConfigs/USAppState';

Cypress.on('uncaught:exception', (err, runnable) => {
  console.log('Ignoring uncaught exception: ', err);
  return false;
});

describe('Verify add to cart with an extended warranty', () => {
  beforeEach(() => {
    stubThirdPartyRoutes();

    cy.intercept(
      'GET',
      '/v1/api/public/subscription/getEmailVerification/*',
    ).as('getEmailVerification');
  });

  it('can add it to cart', () => {
    cy.visitWithFlags('/product/heritage-silver', [
      {
        key: 'extended-warranty',
        enabled: true,
      },
      {
        key: 'pdp-carousel-image-test',
        enabled: false,
      },
      {
        key: 'new-membership-page',
        enabled: false,
      },
      {
        key: 'membership-price-test',
        enabled: false,
      },
      USAppState,
    ]);
    cy.getCy('button-add-to-cart').click();
    cy.getCy('extended-warranty-selector-modal').should('exist');
    cy.getCy('extended-warranty-modal-476021').eq(0).click();
    cy.getCy('modal-add-extended-warranty').click();
    cy.getCy('page-cart').should('exist');
  });

  it('check cart for proper values', () => {
    cy.getCy('product-title').contains('3-Year Protection Plan');
    cy.getCy('price-line-item').contains('$60 USD');
  });

  it('can remove it from cart', () => {
    cy.getCy('button-remove-cart-item').eq(1).click();
  });

  it('cannot view extended warranty options on pdp', () => {
    cy.visitWithFlags('/product/heritage-silver', [
      {
        key: 'extended-warranty',
        enabled: true,
      },
      {
        key: 'pdp-carousel-image-test',
        enabled: false,
      },
      {
        key: 'new-membership-page',
        enabled: false,
      },
      {
        key: 'membership-price-test',
        enabled: false,
      },
      USAppState,
    ]);
    cy.getCy('page-pdp-heritage-silver').should('exist');
  });

  it('can add it when proceeding to cart', () => {
    cy.getCy('button-add-to-cart').click();
    cy.getCy('extended-warranty-modal-476020').eq(0).click();
    cy.getCy('modal-add-extended-warranty').eq(0).click();
  });

  it('check cart for proper values', () => {
    cy.getCy('product-title').contains('3-Year Protection Plan');
    cy.getCy('price-line-item').contains('$60 USD');
  });

  it('can add multiple to cart, if more than one ring', () => {
    cy.visitWithFlags('/product/heritage-gold', [
      {
        key: 'extended-warranty',
        enabled: true,
      },
      {
        key: 'pdp-carousel-image-test',
        enabled: false,
      },
      {
        key: 'new-membership-page',
        enabled: false,
      },
      {
        key: 'membership-price-test',
        enabled: false,
      },
      USAppState,
    ]);
    cy.getCy('button-add-to-cart').click();
    cy.getCy('extended-warranty-modal-476020').eq(0).click();
    cy.getCy('modal-add-extended-warranty').eq(0).click();
    cy.getCy('page-cart').should('exist');
    cy.visitWithFlags('/product/heritage-silver', [
      {
        key: 'extended-warranty',
        enabled: true,
      },
      {
        key: 'pdp-carousel-image-test',
        enabled: false,
      },
      {
        key: 'new-membership-page',
        enabled: false,
      },
      {
        key: 'membership-price-test',
        enabled: false,
      },
      USAppState,
    ]);
    cy.getCy('button-add-to-cart').click();
    cy.getCy('modal-add-extended-warranty').eq(0).click();
    cy.getCy('page-cart').should('exist');
    cy.getCy('product-title').should('contain', '2-Year Protection Plan');
  });
});
