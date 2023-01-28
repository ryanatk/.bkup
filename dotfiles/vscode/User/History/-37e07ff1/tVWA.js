import { stubThirdPartyRoutes } from '../../../utils/utils';
import { MAX_QUANTITY } from '../../../../../../consts/cart';
import { ROOT_STATE } from '../../../../fixtures/cart-horizon/root-state';
import {
  HORIZON_SILVER_3_YEAR_WARRANTY,
  HORIZON_SILVER_2_YEAR_WARRANTY,
  HORIZON_STEALTH_SIZE_8,
  HORIZON_BLACK_SIZE_6,
} from '../../../../fixtures/cart-horizon/line-items';
import { range } from 'lodash';

Cypress.on('uncaught:exception', (err) => {
  // Returning false here prevents Cypress from failing the test.
  console.log('Ignoring uncaught exception: ', err);
  return false;
});

const CART_URL = '/cart';

const MULTIPLE_RINGS_STATE = {
  ...ROOT_STATE,
  cart: {
    ...ROOT_STATE.cart,
    lineItems: [
      ...HORIZON_SILVER_3_YEAR_WARRANTY,
      ...HORIZON_SILVER_2_YEAR_WARRANTY,
    ],
  },
};

const TOO_MANY_RINGS = MAX_QUANTITY + 1;
const TOO_MANY_RINGS_STATE = {
  ...ROOT_STATE,
  cart: {
    ...ROOT_STATE.cart,
    lineItems: [
      ...HORIZON_BLACK_SIZE_6,
      ...HORIZON_STEALTH_SIZE_8,
      ...HORIZON_SILVER_3_YEAR_WARRANTY,
      ...HORIZON_SILVER_2_YEAR_WARRANTY,
    ],
  },
};

const DEFAULT_FLAGS = [
  {
    key: 'enable-cart-horizon',
    enabled: true,
  },
];

const setUpTestSuite = (state, flags = []) => {
  stubThirdPartyRoutes();
  cy.visitWithFlags(CART_URL, [...DEFAULT_FLAGS, ...flags], state);
};

describe(`Cart Multiple Rings`, () => {
  context(`Multi line items disabled`, () => {
    before(() => {
      setUpTestSuite(MULTIPLE_RINGS_STATE, [
        {
          key: 'enable-multi-line-items',
          enabled: false,
        },
      ]);
    });

    it(`Displays the correct number of line items`, () => {
      cy.getCy('cart-product-row').should('have.length', 2);
    });

    it(`Displays the cart message within the first line item`, () => {
      cy.getCy('cart-product-row')
        .eq(0)
        .getCy('cart-alert-message')
        .should('exist')
        .contains('Limit one ring per order.');
    });

    it(`Doesn't allow user to proceed to checkout with multiple rings.`, () => {
      cy.getCy('button-checkout').should('be.disabled');
    });
  });

  context(`Multi line items enabled`, () => {
    before(() => {
      setUpTestSuite(MULTIPLE_RINGS_STATE, [
        {
          key: 'enable-multi-line-items',
          enabled: true,
        },
      ]);
    });

    it(`Displays the correct number of line items`, () => {
      cy.getCy('cart-product-row').should('have.length', 2);
    });

    it(`Displays the cart message within the first line item`, () => {
      cy.getCy('cart-product-row')
        .eq(0)
        .getCy('cart-alert-message')
        .should('exist')
        .contains(`Limit ${MAX_QUANTITY} rings per order.`);
    });

    it(`Allows user to proceed to checkout with multiple rings.`, () => {
      cy.getCy('button-checkout').should('be.enabled');
    });
  });

  context.only(`Multi line items enabled`, () => {
    before(() => {
      setUpTestSuite(TOO_MANY_RINGS_STATE, [
        {
          key: 'enable-multi-line-items',
          enabled: true,
        },
      ]);
    });

    it(`Displays the correct number of line items`, () => {
      cy.getCy('cart-product-row').should('have.length', TOO_MANY_RINGS);
    });

    it(`Displays the cart message within the first line item`, () => {
      cy.getCy('cart-product-row')
        .eq(0)
        .getCy('cart-alert-message')
        .should('exist')
        .contains(`Limit ${MAX_QUANTITY} rings per order.`);
    });

    it(`Does not allow user to proceed to checkout with too many rings.`, () => {
      cy.getCy('button-checkout').should('not.be.enabled');
    });
  });
});
