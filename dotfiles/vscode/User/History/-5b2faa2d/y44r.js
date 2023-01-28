import { stubThirdPartyRoutes } from '../../utils/utils';
import { CartPageHelper } from '../../../support/helpers/CartPage';
import { ProductPageHelper } from '../../../support/helpers/ProductPage';

import ringConfigs from '../../../fixtures/testConfigs/ringTestConfigs';

const ProductPage = new ProductPageHelper();
const CartPage = new CartPageHelper();

const rings = [ringConfigs[0], ringConfigs[1]];

describe(`Cart Multiple Rings`, () => {
  before(() => {
    cy.clearCookies();
    cy.setCookie('discount-token', '');
    stubThirdPartyRoutes();
  });

  it('When flag is off, user cannot add more than 1 ring', () => {
    rings.forEach(({ ring, model, modelUrl, productPageIcon }, index) => {
      cy.visitWithFlags(modelUrl, [
        {
          key: 'enable-multi-line-items',
          enabled: false,
        },
        {
          key: 'extended-warranty',
          enabled: false,
        },
        {
          key: 'membership-price-test',
          enabled: false,
        },
      ]);
      ProductPage.addRingToCart(
        ring,
        model,
        modelUrl,
        productPageIcon,
        undefined,
        undefined,
        undefined,
        true,
      );
      if (index === 0) {
        // assert cart is in good state after adding first ring
        CartPage.assertBottomCheckoutButton();
      } else {
        // assert cart is in bad state after adding multiple rings
        CartPage.assertBottomCheckoutButton(false);
      }
    });
  });

  it('When flag is on, user can add multiple rings and accessories', () => {
    rings.forEach(({ ring, model, modelUrl, productPageIcon }) => {
      cy.visitWithFlags(ProductPage.url, [
        {
          key: 'enable-multi-line-items',
          enabled: true,
        },
        {
          key: 'extended-warranty',
          enabled: false,
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
      ]);
      ProductPage.addRingToCart(
        ring,
        model,
        modelUrl,
        productPageIcon,
        undefined,
        undefined,
        undefined,
        true,
      );
      CartPage.assertBottomCheckoutButton();
    });
    cy.getCy('product-title').should('have.length', 12);
    cy.getCy('button-checkout').should('exist').click();
    cy.getCy('page-checkout').should('exist');
  });

  it('When flag is on, user can add multiple rings with warranties', () => {
    cy.visitWithFlags(ProductPage.url, [
      {
        key: 'enable-multi-line-items',
        enabled: true,
      },
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
    ]);
    cy.getCy('button-add-to-cart').click();
    cy.getCy('extended-warranty-modal-476020').eq(0).click();
    cy.getCy('modal-add-extended-warranty').eq(0).click();
    cy.getCy('page-cart').should('exist');
    cy.getCy('product-title').contains('2-Year Protection Plan');
    cy.getCy('link-continue-shopping').click();
    cy.getCy('button-add-to-cart').click();
    cy.getCy('extended-warranty-modal-476021').eq(0).click();
    cy.getCy('modal-add-extended-warranty').eq(0).click();
    cy.getCy('product-title').contains('3-Year Protection Plan');
    cy.getCy('button-checkout').should('exist').click();
    cy.getCy('page-checkout').should('exist');
  });
});
