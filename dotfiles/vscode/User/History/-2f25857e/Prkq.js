import { stubThirdPartyRoutes } from '../../../utils/utils';
import { ROOT_STATE } from '../../../../fixtures/cart-horizon/root-state';
import {
  HORIZON_SILVER_SIZING_KIT,
  HORIZON_BLACK_SIZE_6,
  CHARGER_SET_SIZE_6,
  CHARGER_SET_SIZE_8,
} from '../../../../fixtures/cart-horizon/line-items';

Cypress.on('uncaught:exception', (err) => {
  // Returning false here prevents Cypress from failing the test.
  console.log('Ignoring uncaught exception: ', err);
  return false;
});

const CART_URL = '/cart';
const UPDATED_QUANTITY = 5;
const CHARGER_QUANTITY_SELECTOR = `[data-cy="select-quantity-charger-set"][data-lineitem="${CHARGER_SET_SIZE_6[0].id}"]`;
const RING_QUANTITY_SELECTOR = `[data-cy="select-quantity-horizon-silver"][data-lineitem="${HORIZON_SILVER_SIZING_KIT[0].id}"]`;

const SINGLE_RING_AND_CHARGER_STATE = {
  ...ROOT_STATE,
  cart: {
    ...ROOT_STATE.cart,
    lineItems: [...HORIZON_SILVER_SIZING_KIT, ...CHARGER_SET_SIZE_6],
  },
};

const SINGLE_RING_AND_MULTIPLE_CHARGERS_STATE = {
  ...ROOT_STATE,
  cart: {
    ...ROOT_STATE.cart,
    lineItems: [
      ...HORIZON_SILVER_SIZING_KIT,
      ...CHARGER_SET_SIZE_6,
      ...CHARGER_SET_SIZE_8,
    ],
  },
};

const MULTIPLE_RINGS_AND_CHARGERS_STATE = {
  ...ROOT_STATE,
  cart: {
    ...ROOT_STATE.cart,
    lineItems: [
      ...HORIZON_SILVER_SIZING_KIT,
      ...HORIZON_BLACK_SIZE_6,
      ...CHARGER_SET_SIZE_6,
      ...CHARGER_SET_SIZE_8,
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

describe(`Cart Update Quantity`, () => {
  context(`Charger quantity disabled`, () => {
    before(() => {
      setUpTestSuite(SINGLE_RING_AND_CHARGER_STATE, [
        {
          key: 'enable-multi-line-items',
          enabled: false,
        },
      ]);
    });

    it(`Doesn't allow user to update quantity for charger`, () => {
      cy.get(CHARGER_QUANTITY_SELECTOR).should('not.exist');
    });
  });

  context(`Charger quantity enabled`, () => {
    before(() => {
      setUpTestSuite(SINGLE_RING_AND_MULTIPLE_CHARGERS_STATE, [
        {
          key: 'enable-multi-line-items',
          enabled: true,
        },
      ]);
    });

    it(`Allows user to update quantity for charger`, () => {
      cy.get(CHARGER_QUANTITY_SELECTOR).should('exist');
      cy.get(CHARGER_QUANTITY_SELECTOR).click();
      cy.get(CHARGER_QUANTITY_SELECTOR)
        .getCy(`option-${UPDATED_QUANTITY}`)
        .should('be.visible')
        .click();
      cy.get(CHARGER_QUANTITY_SELECTOR).contains(UPDATED_QUANTITY);
    });

    it(`Displays the correct amount for the updated line item`, () => {
      const { id, unitPrice } = CHARGER_SET_SIZE_6[0];
      cy.get(`[data-cy="cart-line-item-product"][data-id="${id}"]`)
        .getCy('price-line-item')
        .contains(`$${unitPrice * UPDATED_QUANTITY}`);
    });

    it(`Allows the user to proceed to checkout`, () => {
      cy.getCy('button-checkout').should('be.enabled');
    });

    it(`Doesn't allow the user to proceed to checkout when number of chargers exceeds max`, () => {
      cy.get(CHARGER_QUANTITY_SELECTOR).click();
      cy.get(CHARGER_QUANTITY_SELECTOR)
        .getCy(`option-10`)
        .should('be.visible')
        .click();
      cy.get(CHARGER_QUANTITY_SELECTOR).contains('10');
      cy.getCy('button-checkout').should('be.disabled');
    });
  });

  context(`Multi line items disabled`, () => {
    before(() => {
      setUpTestSuite(SINGLE_RING_AND_CHARGER_STATE, [
        {
          key: 'enable-multi-line-items',
          enabled: false,
        },
      ]);
    });

    it(`Doesn't allow user to update quantity for ring`, () => {
      cy.get(RING_QUANTITY_SELECTOR).should('not.exist');
    });
  });

  context(`Multi line items enabled`, () => {
    before(() => {
      setUpTestSuite(MULTIPLE_RINGS_AND_CHARGERS_STATE, [
        {
          key: 'enable-multi-line-items',
          enabled: true,
        },
      ]);
    });

    it(`Allows user to update quantity for ring`, () => {
      cy.get(RING_QUANTITY_SELECTOR).should('exist');
      cy.get(RING_QUANTITY_SELECTOR).click();
      cy.get(RING_QUANTITY_SELECTOR)
        .getCy(`option-${UPDATED_QUANTITY}`)
        .should('be.visible')
        .click();
      cy.get(RING_QUANTITY_SELECTOR).contains(UPDATED_QUANTITY);
    });

    it(`Displays the correct amount for the updated line item`, () => {
      const { id, unitPrice } = HORIZON_SILVER_SIZING_KIT[0];
      cy.get(`[data-cy="cart-line-item-product"][data-id="${id}"]`)
        .getCy('price-line-item')
        .contains(`$${unitPrice * UPDATED_QUANTITY}`);
    });

    it(`Allows the user to proceed to checkout`, () => {
      cy.getCy('button-checkout').should('be.enabled');
    });

    it(`Doesn't allow the user to proceed to checkout when number of rings exceeds max`, () => {
      cy.get(RING_QUANTITY_SELECTOR).click();
      cy.get(RING_QUANTITY_SELECTOR)
        .getCy(`option-10`)
        .should('be.visible')
        .click();
      cy.get(RING_QUANTITY_SELECTOR).contains('10');
      cy.getCy('button-checkout').should('be.disabled');
    });
  });
});
