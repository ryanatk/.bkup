import { stubThirdPartyRoutes } from '../../utils/utils';
import { CartPageHelper } from '../../../support/helpers/CartPage';
import { ProductPageHelper } from '../../../support/helpers/ProductPage';

import ringConfigs from '../../../fixtures/testConfigs/ringTestConfigs';

const ProductPage = new ProductPageHelper();
const CartPage = new CartPageHelper();

const rings = [ringConfigs[0], ringConfigs[1]];

const DEFAULT_FLAGS = {
            key: 'extended-warranty',
            enabled: false,
          },
          {
            key: 'membership-price-test',
            enabled: false,
          },

describe('Cart: update quantity', () => {
  before(() => {
    cy.clearCookies();
    cy.setCookie('discount-token', '');
    stubThirdPartyRoutes();
  });

  describe('with multi-line-items off', () => {
    it('Cannot update quantity on a ring', () => {
      rings.forEach(({ ring, model, modelUrl, productPageIcon }, index) => {
        cy.visitWithFlags(modelUrl, [
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
        if (index === 0) {
          // assert cart is in good state after adding first ring
          CartPage.assertBottomCheckoutButton();
        } else {
          // assert cart is in bad state after adding multiple rings
          CartPage.assertBottomCheckoutButton(false);
        }
      });
    });
  });
});
