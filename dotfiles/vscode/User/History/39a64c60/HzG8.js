import paymentGatewayResponse from '../../../fixtures/api/paymentGateway.json';

const fillPaymentPaypal = () => {
  cy.intercept('POST', '/v1/api/public/paypal/setExpressCheckout', {
    status: 200,
    response: {
      url: '',
      token: '12345',
      gateway: 'paypal',
    },
  }).as('postSetExpressCheckout');

  cy.getCy('payment-edit').should('exist.and.be.visible');
  cy.getCy('radio-checkout-payment-paypal').click();
  cy.get('#paypal-button').find('.paypal-button-widget').should('be.visible');

  cy.intercept('POST', '/graphql', (req) => {
    const { body } = req;

    if (body.query.includes('query PaymentGateway')) {
      req.alias = 'PaymentGateway';
      req.reply(paymentGatewayResponse);
    }
    if (
      body.query.includes('query Product') &&
      body.variables.productType === 'Shipping'
    ) {
      req.alias = 'FetchShippingMethods';
    }
  });

  cy.window().then((win) => {
    const appState = win.store.getState();
    cy.visitWithState(
      '/checkout?gateway=paypal_express_usd&token=EC-7X642137J40301106',
      {
        ...appState,
        checkout: {
          ...appState.checkout,
          gateway: 'paypal_express_usd',
          token: 'EC-7X642137J40301106',
        },
      },
    );

    cy.wait('@FetchShippingMethods');
    cy.wait('@PaymentGateway');

    cy.intercept('POST', '/api/order', {
      fixture: 'order/postOrderSuccess',
    }).as('orderRequest');

    cy.getCy('paypal-auth-success-notice').should('be.visible');
    cy.getCy('checkbox-checkout-agreement').click();
    cy.getCy('checkbox-checkout-agreement').find('input').should('be.checked');
    cy.getCy('button-submit-payment').should('be.enabled').click();

    // Wait for order to finish processing
    cy.wait('@orderRequest', { timeout: 30000 })
      .its('response.statusCode')
      .should('equal', 200);
  });
};

export default fillPaymentPaypal;
