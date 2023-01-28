import fillAccountInfo from './fill-account-info';
import fillGiftOptions from './fill-gift-options';
import fillDeliveryAddress from './fill-delivery-address';
import fillShippingMethod from './fill-shipping-method';
import fillBillingAddress from './fill-billing-address';

const DEFAULT_OPTIONS = {
  addressVerification: true,
  billingSameAsShipping: false,
  isGift: false,
  isGiftDelivery: false,
  isCreditCard: false,
};

const fillCheckoutSteps = (state = {}, options = {}) => {
  const optionsWithDefaults = Object.assign({}, DEFAULT_OPTIONS, options);

  it(`Allows the customer to enter account info`, () => {
    cy.intercept(
      'GET',
      '/v1/api/public/subscription/getEmailVerification/*',
    ).as('getEmailVerification');
    cy.getCy('account-info-edit').should('exist');
    fillAccountInfo(state.accountInfo, optionsWithDefaults);
    cy.getCy('checkout-account-next-button').click();
    cy.wait('@getEmailVerification');
    cy.getCy('account-info-complete').should('exist');
  });

  if (state.giftOptions) {
    it(`Allows the customer to enter gift options`, () => {
      cy.getCy('gift-options-edit').should('exist');
      fillGiftOptions(state.giftOptions);

      cy.getCy('checkout-gift-options-next-button').should('exist').click();
      cy.getCy('gift-options-complete').should('exist');
    });
  }

  it(`Allows the customer to enter delivery address`, () => {
    cy.intercept('POST', '/v1/api/public/address/getAddressVerification').as(
      'getAddressVerification',
    );

    cy.getCy('delivery-address-edit').should('exist');

    fillDeliveryAddress(state.deliveryAddress, optionsWithDefaults);

    cy.getCy('checkout-delivery-next-button').click();

    if (optionsWithDefaults.addressVerification) {
      cy.wait('@getAddressVerification', { timeout: 30000 });
    }

    cy.getCy('delivery-address-complete').should('exist');
  });

  if (state.shippingMethod) {
    it(`Allows the customer to enter shipping method`, () => {
      cy.getCy('shipping-method-edit').should('exist');
      fillShippingMethod(state.shippingMethod);
      cy.getCy('checkout-shipping-method-next-button').click();
      cy.getCy('shipping-method-complete').should('exist');
    });
  }

  it(`Allows the customer to enter billing address`, () => {
    cy.getCy('billing-address-edit').should('exist');
    fillBillingAddress(state.billingAddress, optionsWithDefaults);
    cy.getCy('checkout-billing-next-button').click();
    cy.wait('@PaymentGateway');
    if (optionsWithDefaults.isCreditCard) {
      cy.wait('@cardDetailsInput')
        .its('response.statusCode')
        .should('equal', 200);
      cy.wait('@getZuoraKey');
    }
    cy.getCy('billing-address-complete').should('exist');
  });
};

export default fillCheckoutSteps;
