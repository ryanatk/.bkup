// import { stubThirdPartyRoutes } from '../../utils/utils';
import { ProductPageHelper } from '../../../support/helpers/ProductPage';

import ringConfigs from '../../../fixtures/testConfigs/ringTestConfigs';

const ProductPage = new ProductPageHelper();

const ringConfig = ringConfigs[0];

const DEFAULT_FLAGS = [
  {
    key: 'extended-warranty',
    enabled: false,
  },
  {
    key: 'membership-price-test',
    enabled: false,
  },
];

describe('Cart: update quantity', () => {
  it('Cannot update quantity on a charger with enable-charger-quantity off', () => {
    cy.visitWithFlags(ProductPage.chargerUrl, [
      ...DEFAULT_FLAGS,
      {
        key: 'enable-charger-quantity',
        enabled: false,
      },
    ]);
    ProductPage.addChargerToCart();
    cy.getCy(`select-quantity-charger-set`).should('not.exist');
  });

  it('Can update quantity on a charger with enable-charger-quantity on', () => {
    cy.visitWithFlags(ProductPage.chargerUrl, [
      ...DEFAULT_FLAGS,
      {
        key: 'enable-charger-quantity',
        enabled: true,
      },
    ]);
    ProductPage.addChargerToCart();
    cy.getCy(`select-quantity-charger-set`).should('exist');
  });

  it('Cannot update quantity on a ring with multi-line-items off', () => {
    const { ring, model, modelUrl, productPageIcon } = ringConfig;

    cy.visitWithFlags(modelUrl, [
      ...DEFAULT_FLAGS,
      {
        key: 'enable-multi-line-items',
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
    cy.getCy(`select-quantity-${model}`).should('not.exist');
  });

  it('Can update quantity on a ring with multi-line-items on', () => {
    const { ring, model, modelUrl, productPageIcon } = ringConfig;

    cy.visitWithFlags(modelUrl, [
      ...DEFAULT_FLAGS,
      {
        key: 'enable-multi-line-items',
        enabled: true,
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
    cy.getCy(`select-quantity-${model}`).should('exist');
  });
});
