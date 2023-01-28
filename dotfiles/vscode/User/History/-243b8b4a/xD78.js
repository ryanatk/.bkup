import { CheckoutPageHelper } from '../../../support/helpers/CheckoutPage';
import { stubThirdPartyRoutes } from '../../utils/utils';
import ringConfigs from '../../../fixtures/testConfigs/ringTestConfigs';
import cart from '../../../fixtures/testConfigs/fakeCartState';
import USAppState from '../../../fixtures/testConfigs/USAppState';

const CheckoutPage = new CheckoutPageHelper();
const appState = USAppState;
const { ring, product_id, id, sku } = ringConfigs[0];

const flags = [
  {
    key: 'expedited-shipping',
    enabled: true,
  },
  {
    key: 'address-verification',
    enabled: false,
  },
];

const shippingAddress = {
  fname: 'Kitty',
  lname: 'Byron',
  address: '6511 SW 19th St',
  address2: '',
  city: 'Miami',
  country: 'US',
  postal: '33155',
  state: 'Florida',
  phone: '5205616810',
  email: `cypress+${Math.floor(Date.now())}@ouraring.com`,
};

const billingAddress = {
  fname: 'Kat',
  lname: 'Bloggs',
  address: 'Elektroniikkatie 10',
  address2: '',
  city: 'Oulu',
  country: 'FI',
  postal: '90590',
  phone: '0912341234',
  email: `cypress+${Math.floor(Date.now())}@ouraring.com`,
};

describe('As a user I can checkout with a different billing address', () => {
  beforeEach(() => {
    stubThirdPartyRoutes();
    cart.lineItems[0].productId = product_id;
    cart.lineItems[0].sku = sku;
    appState.checkout['cart'] = cart;
    appState['cart'] = cart;

    cy.intercept('GET', '/v1/api/public/subscription/getEmailVerification/*', {
      available: true,
      status: 200,
    }).as('getEmailVerification');

    cy.intercept('POST', '/v1/api/public/address/getAddressVerification', {
      status: 200,
      response: {
        status: 'success',
        message: 'Address verification processed.',
      },
    });

    cy.clearCookie('discount-token');
    cy.clearCookie('discount-message');

    cy.visitWithFlags('/checkout', flags, appState);
  });

  it('User can go through without a billing address', () => {
    cy.wait(1500);

    CheckoutPage.assertPage();

    CheckoutPage.inputUserInformation(
      shippingAddress.email,
      shippingAddress.fname,
      shippingAddress.lname,
      shippingAddress.address,
      shippingAddress.address2,
      shippingAddress.city,
      shippingAddress.postal,
      shippingAddress.phone,
      shippingAddress.state,
      shippingAddress.country,
      true,
      'afterShippingAdd',
    );

    // intercept
    cy.intercept(
      'https://sandbox.eu.zuora.com/apps/*paymentGateway=braintree*',
    ).as('cardDetailsInput');

    cy.getCy(CheckoutPage.shippingNextButton).click({ scrollBehavior: false });

    cy.getCy(CheckoutPage.shippingMethodButton).click({
      scrollBehavior: false,
    });

    cy.getCy(CheckoutPage.billingNextButton).click({ scrollBehavior: false });

    cy.wait('@cardDetailsInput')
      .its('response.statusCode')
      .should('equal', 200);

    cy.get('[data-cy="radio-checkout-payment-braintree"]')
      .find('input')
      .should('be.checked');
  });

  it('User can go through with a billing address', () => {
    cy.wait(1500);

    CheckoutPage.assertPage();

    const email = `cypress+${Math.floor(Date.now())}@ouraring.com`;

    CheckoutPage.inputUserInformation(
      email,
      shippingAddress.fname,
      shippingAddress.lname,
      shippingAddress.address,
      shippingAddress.address2,
      shippingAddress.city,
      shippingAddress.postal,
      shippingAddress.phone,
      shippingAddress.state,
      shippingAddress.country,
      true,
      'afterShippingAdd',
    );

    // intercept
    cy.intercept(
      'https://sandbox.eu.zuora.com/apps/*paymentGateway=braintree*',
    ).as('cardDetailsInput');

    cy.getCy(CheckoutPage.shippingNextButton).click({ scrollBehavior: false });

    cy.getCy(CheckoutPage.shippingMethodButton).click({
      scrollBehavior: false,
    });

    cy.getCy(CheckoutPage.billingAddressSame).click({ scrollBehavior: false });

    cy.fillBillingAddress(billingAddress);

    cy.getCy(CheckoutPage.billingDifferentAddressNextButton).click({
      scrollBehavior: false,
    });

    cy.wait('@cardDetailsInput')
      .its('response.statusCode')
      .should('equal', 200);

    cy.get('[data-cy="radio-checkout-payment-braintree"]')
      .find('input')
      .should('be.checked');
  });

  it.only('User can see and edit given billing address after confirming it', () => {
    cy.wait(1500);

    CheckoutPage.assertPage();

    const email = `cypress+${Math.floor(Date.now())}@ouraring.com`;

    CheckoutPage.inputUserInformation(
      email,
      shippingAddress.fname,
      shippingAddress.lname,
      shippingAddress.address,
      shippingAddress.address2,
      shippingAddress.city,
      shippingAddress.postal,
      shippingAddress.phone,
      shippingAddress.state,
      shippingAddress.country,
      true,
      'afterShippingAdd',
    );

    // intercept
    cy.intercept(
      'https://sandbox.eu.zuora.com/apps/*paymentGateway=braintree*',
    ).as('cardDetailsInput');

    cy.getCy(CheckoutPage.shippingNextButton).click({ scrollBehavior: false });

    cy.getCy(CheckoutPage.shippingMethodButton).click({
      scrollBehavior: false,
    });

    cy.getCy(CheckoutPage.billingAddressSame).click({ scrollBehavior: false });

    cy.fillBillingAddress(billingAddress);

    cy.getCy(CheckoutPage.billingDifferentAddressNextButton).click({
      scrollBehavior: false,
    });

    cy.wait('@cardDetailsInput')
      .its('response.statusCode')
      .should('equal', 200);

    cy.getCy(CheckoutPage.cardPayment).find('input').should('be.checked');

    cy.getCy(CheckoutPage.billingPartitionEdit).click({
      scrollBehavior: false,
    });

    cy.getCy(CheckoutPage.firstNameField)
      .find('input')
      .should('have.value', billingAddress.fname);
    cy.getCy(CheckoutPage.lastNameField)
      .find('input')
      .should('have.value', billingAddress.lname);
    cy.getCy(CheckoutPage.addressField)
      .find('input')
      .should('have.value', billingAddress.address);
    cy.getCy(CheckoutPage.cityField)
      .find('input')
      .should('have.value', billingAddress.city);
    cy.getCy(CheckoutPage.postalCodeField)
      .find('input')
      .should('have.value', billingAddress.postal);
    cy.getCy(CheckoutPage.phoneNumberField)
      .find('input')
      .should('have.value', billingAddress.phone);
    cy.getCy(CheckoutPage.countryField)
      .find('input')
      .should('have.value', billingAddress.country);

    cy.fillBillingAddress(billingAddress);

    cy.getCy(CheckoutPage.billingDifferentAddressNextButton).click({
      scrollBehavior: false,
    });

    cy.getCy(CheckoutPage.cardPayment).find('input').should('be.checked');
  });
});
