import fillCheckoutSteps from './fill-checkout-steps';
import fillPaymentPaypal from './fill-payment-paypal';

const checkoutWithPaypal = (state = {}, options = {}) => {
  fillCheckoutSteps(state, options);

  it(`Allows the customer to submit order via Paypal`, () => {
    fillPaymentPaypal();
  });

  it(`Displays the order summary after order success`, () => {
    cy.getCy('page-order-confirmation').should('exist');
  });
};

export default checkoutWithPaypal;
