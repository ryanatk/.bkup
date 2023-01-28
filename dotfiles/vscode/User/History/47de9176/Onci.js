import { ACCOUNT_INFO_STATE } from '../../../fixtures/checkout-new/account-info-state';
import { BILLING_ADDRESS_STATE_US } from '../../../fixtures/checkout-new/billing-address-state';
import { DELIVERY_ADDRESS_STATE_US } from '../../../fixtures/checkout-new/delivery-address-state';
import proceedToCheckout from '../../utils/cart/proceed-to-checkout';
import assertOrderDetails from '../../utils/checkout/assert-order-details';
import checkoutWithPaypal from '../../utils/checkout/checkout-with-paypal';
import selectProductAndAddToCart from '../../utils/pdp/select-product-and-add-to-cart';
import { basicAuth, stubThirdPartyRoutes } from '../../utils/utils';

const { account: accountInfo } = ACCOUNT_INFO_STATE;
const { shippingAddress: deliveryAddress } = DELIVERY_ADDRESS_STATE_US;
const { billingAddress } = BILLING_ADDRESS_STATE_US;

describe(`Checkout Flow > Paypal (US Customer)`, () => {
  before(() => {
    stubThirdPartyRoutes();
    cy.visit('/product/horizon-silver', {
      ...basicAuth,
    });
  });

  beforeEach(() => {
    // Intercept PaymentGateway GraphQL request
    cy.intercept('POST', '/graphql', (req) => {
      const { body } = req;

      if (body.query.includes('query PaymentGateway')) {
        req.alias = 'PaymentGateway';
      }
    });
  });

  it.skip(`Directs the user to the PDP`, () => {
    cy.getCy('page-horizon-pdp', { isring: true }).should('exist');
  });

  it.skip(`Allows the user to add a ring to their cart`, () => {
    selectProductAndAddToCart({
      style: 'horizon',
      finish: 'silver',
      size: '8',
    });
  });

  it.skip(`Directs the user to the Cart`, () => {
    cy.getCy('page-cart').should('exist');
  });

  it.skip(`Allows the user to proceed to checkout`, () => {
    proceedToCheckout();
  });

  it.skip(`Displays the correct line items and subtotal`, () => {
    assertOrderDetails([
      {
        product: 'horizon-silver',
        price: 349,
      },
    ]);
  });

  checkoutWithPaypal({
    accountInfo,
    deliveryAddress,
    shippingMethod: 'standard-shipping',
    billingAddress,
  });
});
