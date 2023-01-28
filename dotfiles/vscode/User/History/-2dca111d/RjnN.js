import { stubThirdPartyRoutes } from '../../utils/utils';
import { CartPageHelper } from '../../../support/helpers/CartPage';
import { ProductPageHelper } from '../../../support/helpers/ProductPage';

import ringConfigs from '../../../fixtures/testConfigs/ringTestConfigs';

const ProductPage = new ProductPageHelper();
const CartPage = new CartPageHelper();

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
  before(() => {
    cy.clearCookies();
    cy.setCookie('discount-token', '');
    stubThirdPartyRoutes();
  });

  describe('with multi-line-items off', () => {
    it('Cannot update quantity on a ring', () => {
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
      CartPage.removeFromCartButton.click();
    });

    it.only('Can update quantity on a charger', () => {
      cy.visitWithFlags(ProductPage.chargerUrl, [
        ...DEFAULT_FLAGS,
        {
          key: 'enable-multi-line-items',
          enabled: false,
        },
      ]);
      ProductPage.addChargerToCart();
      cy.getCy(`select-quantity-charger-set`).should('exist');
      CartPage.removeFromCartButton.click();
    });
  });
});
