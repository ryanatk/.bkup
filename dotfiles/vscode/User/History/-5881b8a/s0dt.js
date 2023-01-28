import { stubThirdPartyRoutes } from '../../utils/utils';

Cypress.on('uncaught:exception', (err) => {
  // Returning false here prevents Cypress from failing the test.
  console.log('Ignoring uncaught exception: ', err);
  return false;
});

const HERITAGE_URL = '/product/heritage-silver';
const CHARGER_SET_URL = '/product/charger-set';
const ONE_YEAR_WARRANTY_SELECTOR = 'included-warranty-modal';
const TWO_YEAR_WARRANTY_SELECTOR = 'extended-warranty-modal-476020';
const THREE_YEAR_WARRANTY_SELECTOR = 'extended-warranty-modal-476021';

const DEFAULT_FLAGS = [
  {
    key: 'enable-horizon',
    enabled: true,
  },
];

const setUpTestSuite = (url, flags = []) => {
  stubThirdPartyRoutes();
  cy.visitWithFlags(url, [...DEFAULT_FLAGS, ...flags]);
};

describe('PDP Extended Warranty', () => {
  context('Ring PDP - Extended Warranty Enabled', () => {
    before(() => {
      setUpTestSuite(HERITAGE_URL, [
        {
          key: 'extended-warranty',
          enabled: true,
        },
      ]);
    });

    it('Shows user the extended warranty modal after clicking "Add to Cart"', () => {
      cy.getCy('button-add-to-cart').click();
      cy.getCy('extended-warranty-selector-modal').should('be.visible');
    });

    it('Has free 1 year warranty selected by default', () => {
      cy.getCy(ONE_YEAR_WARRANTY_SELECTOR).should('be.visible.and.enabled');
      cy.getCy(ONE_YEAR_WARRANTY_SELECTOR).should(
        'have.attr',
        'data-selected',
        'true',
      );
    });

    it('Allows user to select 2 year extended warranty', () => {
      cy.getCy(TWO_YEAR_WARRANTY_SELECTOR)
        .should('be.visible.and.enabled')
        .click();
      cy.getCy(TWO_YEAR_WARRANTY_SELECTOR).should(
        'have.attr',
        'data-selected',
        'true',
      );
    });

    it('Allows user to select 3 year extended warranty', () => {
      cy.getCy(THREE_YEAR_WARRANTY_SELECTOR)
        .should('be.visible.and.enabled')
        .click();
      cy.getCy(THREE_YEAR_WARRANTY_SELECTOR).should(
        'have.attr',
        'data-selected',
        'true',
      );
    });

    it('Allows user to continue to cart after selecting a warranty', () => {
      cy.getCy('modal-add-extended-warranty').click();
      cy.getCy('page-cart').should('exist');
    });
  });

  context('Ring PDP - Extended Warranty Disabled', () => {
    before(() => {
      setUpTestSuite(HERITAGE_URL, [
        {
          key: 'extended-warranty',
          enabled: false,
        },
      ]);
    });

    it.only('Does not allow user to select extended warranty', () => {
      cy.getCy('button-add-to-cart').should('exist').click();
      cy.getCy('extended-warranty-selector-modal').should('not.be.visible');
      cy.getCy('page-cart').should('exist');
    });
  });

  context('Charger Set PDP - Extended Warranty Enabled', () => {
    before(() => {
      setUpTestSuite(CHARGER_SET_URL, [
        {
          key: 'extended-warranty',
          enabled: true,
        },
      ]);
    });

    it('Does not allow user to select extended warranty', () => {
      cy.getCy('button-select-size-8').should('exist').click();
      cy.getCy('button-add-to-cart').should('exist').click();
      cy.getCy('page-cart').should('exist');
    });
  });
});
