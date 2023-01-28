import { CheckoutPageHelper } from './CheckoutPage';

export class MyAccountPageHelper extends CheckoutPageHelper {
  constructor() {
    super();

    this.flags = [
      {
        key: 'my-account-mermbership',
        enabled: true,
      },
      {
        key: 'my-account-billing-history',
        enabled: true,
      },
      {
        key: 'my-account-cancel-subscription',
        enabled: true,
      },
      {
        key: 'my-account-renew-subscription',
        enabled: true,
      },
      {
        key: 'zuora-set-agreement',
        enabled: true,
      },
      {
        key: 'my-account-allow-paypal',
        enabled: true,
      },
    ];

    // Page
    this.orderIntercept = 'api/my-order/post-payment-method';

    // Page elements
    this.membershipTabElement = 'tab-membership';
    this.ordersTabElement = 'tab-order-details';
    this.cancelSubscriptionButton = 'subscription-cancel-button';
    this.paymentHistoryButton = 'subscription-history-button';
    this.addPaymentMethodButton = 'subscription-add-payment-method';
    this.editPaymentMethodButton = 'link-edit-payment-method';
    this.billingHistoryInvoiceTable = 'my-account-invoice-history-table';
    this.renewSubButton = 'button-renew-subscription';
    this.activeb2bSubTextElement = 'membership-active-b2b';
    this.billingForm = '#formBilling';
    this.checkoutStep0 = 'checkout-step-0';
    this.buttonNext = 'button-submit-billing-address';
    this.savePaymentButton = 'my-account-save-payment';
    this.termsAgreementTickBox = 'input[name=terms-agreement]';
    this.submitPaymentButton = 'my-account-save-payment';
    this.changePaymentMethodSuccess = 'my-account-update-payment-success';
    this.methodChangeSuccessText = 'Your payment method was saved successfully';
    this.myOrderDashElement = 'page-my-order-dashboard';

    this.cancelMemeberShipModal = 'my-account-cancel-membership-modal';
    this.cancelMemeberShipModalKeepButton =
      'my-account-cancel-membership-modal-button-keep';
    this.cancelMemeberShipModalError =
      'my-account-cancel-membership-modal-error';
    this.cancelMemberShipConfirmButton =
      'my-account-cancel-membership-modal-button-confirm';
    this.cancelMemberShipCloseButton = 'modal-close';
    this.sormusPrice = 'sormus-price';

    // Hard coded test sites and texts
    this.pendingSixMonthUrl =
      'my-account/test_token_sixmonth_pending/membership';
    this.pendingSixMonthElement = 'membership-pending-sixmonth';
    this.pendingSixMonthText =
      'Your 6-month free trial membership will start when you activate your Oura Ring in-app.';

    this.pendingLifeTimeUrl =
      'my-account/test_token_lifetime_pending/membership';
    this.pendingLifeTimeElement = 'membership-pending-lifetime';
    this.pendingLifeTimeText =
      'Thank you for supporting Oura. Your lifetime Oura membership is on us! Your membership will start when you activate your Oura Ring in-app.';

    this.pendingNoFreeTrialUrl =
      'my-account/test_token_pending_notrial/membership';
    this.pendingNoFreeTrialElement = 'membership-pending';
    this.pendingNoFreeTrialText =
      'Your membership will start when you activate your Oura Ring in-app';

    this.activeSixMonthTrialUrl =
      'my-account/test_token_sixmonth_active/membership';
    this.activeSixMonthTrialElement = 'membership-active-trial';
    this.activeSixMonthTrialText = 'Your free trial membership will end on ';

    this.activeSixMonthTrialNoPaymentUrl =
      'my-account/test_token_sixmonth_active_no_payment/membership';
    this.activeSixMonthTrialNoPaymentElement =
      'membership-active-trial-no-payment';
    this.activeSixMonthTrialNoPaymentText =
      'Your free trial membership will end on ';

    this.activeLifeTimeSubUrl =
      'my-account/test_token_lifetime_active/membership';
    this.activeLifeTimeSubElement = 'membership-active-lifetime';
    this.activeLifeTimeSubText =
      'Thank you for supporting Oura. Your lifetime Oura membership is on us!';

    this.activeSubUrl = 'my-account/test_token_active_after_trial/membership';
    this.activeSubElement = 'subscription-status';
    this.activeSubText = 'Your membership is currently active.';

    this.expiredTrialUrl =
      'my-account/test_token_expired_after_trial/membership';
    this.expiredTrialText = 'Your Oura membership';
    this.paymentMethodTextElement = 'subscription-payment-method';

    this.expiredSubUrl = ''; // TODO on the front end
    this.expiredSubElement = 'membership-cancelled-inactive';

    this.noSubFoundUrl = 'my-account/test_token_no_subscription/membership';
    this.noSubFoundSelector = 'text-no-sub-found';
    this.noSubFoundText = 'Membership details coming soon.';

    this.errorFromBackEndUrl = 'my-account/test_token_backend_error/membership';
    this.errorFromBackEndElement = 'Alert_alert--error';
    this.errorFromBackEndText =
      'Sorry, there was an error fetching your subscription.';

    this.renewSubUrl =
      '/my-account/53a7c611301aed411e43e7699fb645ad170ec1258375cc591912151740b570212008be1f03f3fe79e8b0697aadb3744fa37e5e0de88c1373e9e693e925edea6812909bec0fb4fe511560c49cd1cd1d4a9e8cee184d642d570dcb1ad680799972/membership';
    this.renewSubBtn = 'button-renew-subscription';
    this.inactiveSubText = 'Your Oura membership is currently inactive';

    // OrderPage specific elements
    this.myAccount = 'h1.text-helsinkiBlue';
    this.ourMission = 'div#tab-order-details p.mb-8';

    this.myAccountText = 'My Account';
    this.ourMissionText = 'Our mission is to ensure';
    this.yourMembershipText = 'Your membership will start';
  }

  goPageWithEmail(email, page) {
    const ecomEndpoint =
      Cypress.env('ECOM_API_ENDPOINT') ||
      'https://ouraservices.ecom.ourastage.com';
    const graphqlUrl = ecomEndpoint + '/graphql';

    if (!getEcomApiKey()) {
      throw new Error(
        'Cannot get the my-account page link without api key. Please provide graphql api key as env parameter',
      );
    }

    cy.request({
      method: 'POST',
      url: graphqlUrl,
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${getEcomApiKey()}`,
      },
      body: {
        variables: {},
        query: `{createMyAccountToken(email: \"${email}\") {${page}}}`,
      },
    })
      .then((response) => {
        if (response.status == 200 && page == 'ordersPageUrl') {
          cy.visit(response.body.data.createMyAccountToken.ordersPageUrl);
        } else if (response.status == 200 && page == 'membershipPageUrl') {
          cy.visit(response.body.data.createMyAccountToken.membershipPageUrl);
        } else {
          throw new Error(
            `Got bad response from server ${JSON.stringify(response)}`,
          );
        }
      })
      .then((jsondata) => {
        cy.log('there should be data');
      });
  }

  visitWithMockedData(url) {
    cy.visitWithFlags(url, this.flags);
  }

  assertMemberShipPage(
    paymentButton,
    paymentMethodElement,
    cancelSubButton,
    HistoryButton,
    editPaymentButton,
    renewSubButton = 'not.exist',
  ) {
    // Check page elements
    cy.get(this.homeButton).should('be.visible');
    cy.get('h1').contains('My Account');
    cy.getCy(this.membershipTabElement).should('be.visible');

    // Test payment utils
    cy.getCy(this.addPaymentMethodButton).should(paymentButton);
    cy.getCy(this.paymentMethodTextElement).should(paymentMethodElement);
    cy.getCy(this.editPaymentMethodButton).should(editPaymentButton);

    // Test cancelation
    cy.getCy(this.cancelSubscriptionButton).should(cancelSubButton);

    // Billing history
    cy.getCy(this.paymentHistoryButton).should(HistoryButton);

    // Renew subscription
    cy.getCy(this.renewSubButton).should(renewSubButton);
  }

  assertEditPaymentMethodPage() {
    cy.location('pathname').should('contain', 'membership/update-payment');
    cy.getCy(this.membershipTabElement).should('be.visible');
    cy.getCy(this.checkoutStep0).should('be.visible');
    cy.get(this.homeButton).should('be.visible');
    cy.get(this.billingForm).should('be.visible');
  }

  clickCancelSubscription() {
    cy.getCy(this.cancelSubscriptionButton).click({ force: true });

    // Check modal and buttons
    cy.getCy(this.cancelMemeberShipModal).should('be.visible');
    cy.getCy(this.cancelMemberShipConfirmButton).should('be.visible');
    cy.getCy(this.cancelMemeberShipModalKeepButton).should('be.visible');
    cy.getCy(this.cancelMemberShipCloseButton).should('be.visible');
  }

  closeSubscriptionModal() {
    cy.get('[class="tailwind"]').within(() => {
      cy.getCy(this.cancelMemberShipCloseButton).filter(':visible').click();
    });

    cy.getCy(this.cancelMemeberShipModal).should('not.be.visible');
  }

  clickKeepSubscription() {
    cy.getCy(this.cancelMemeberShipModalKeepButton).click();
    cy.getCy(this.cancelMemeberShipModal).should('not.be.visible');
  }

  clickConfirmCancelation(error) {
    cy.getCy(this.cancelMemberShipConfirmButton).click();

    // Check the error modal
    if (error) {
      cy.getCy('my-account-cancel-membership-modal-error').should('be.visible');
    } else {
      cy.getCy('my-account-cancel-membership-modal-error').should('not.exist');
    }
  }

  clickBillingHistory() {
    cy.getCy(this.paymentHistoryButton).click();

    // Check elements on the page
    cy.get(this.homeButton).should('be.visible');
    cy.getCy(this.billingHistoryInvoiceTable).within(() => {
      cy.contains('Date');
      cy.contains('Amount');
    });
  }

  clickEditPaymentMethod() {
    cy.getCy(this.editPaymentMethodButton).click();
    this.assertEditPaymentMethodPage();
  }

  /** Accepts transaction terms and places order
   * If state and modal both are not null/false, check the cell phone Challenge Data Entry
   *
   * @param {string} state
   * @param {boolean} modal
   */
  acceptTermsAndPlaceOrder(state = '', modal = false) {
    // Intercepts for text message confirmation (US only) and order
    cy.intercept(
      'POST',
      'https://0merchantacsstag.cardinalcommerce.com/MerchantACSWeb/creq.jsp',
    ).as('iframe');
    cy.intercept('POST', 'https://www.recaptcha.net/recaptcha/*', {
      statusCode: 200,
    }).as('reCaptcha');

    // cy.intercept('POST', '/api/order', {
    //   fixture: 'api/my-order/post-payment-method',
    // }).as('postPaymentMethod');

    // Check terms box and place order
    cy.get(this.termsAgreementTickBox).check();
    cy.getCy(this.submitPaymentButton).click({ scrollBehavior: false });

    // Enter 3ds information Cardinal-CCA-IFrame if in US - state is used for it
    if (state != '' && modal) {
      // Wait iframe
      cy.wait('@iframe', { timeout: 60000 })
        .its('response.statusCode')
        .should('equal', 200);
      this.inputCodeToModal();
    }

    // Wait order to go through
    // cy.wait('@postPaymentMethod', { timeout: 60000 })
    //   .its('response.statusCode')
    //   .should('equal', 200);
  }

  clickNext() {
    // intercept
    cy.intercept(
      'https://sandbox.eu.zuora.com/apps/*paymentGateway=braintree*',
    ).as('cardDetailsInput');

    // Click next and wait for the card details
    cy.getCy(this.buttonNext).click();
    cy.wait('@cardDetailsInput')
      .its('response.statusCode')
      .should('equal', 200);
  }

  inputUserInformation(
    email = `ecom+${Math.floor(Date.now())}@ringtesting.com`,
    firstName = 'Cypress',
    lastName = 'Test',
    address = 'Test St 19',
    address2 = '',
    city = 'Test York',
    postalCode = '00666',
    phone = '0100123123',
    state = '',
    country = '',
  ) {
    // Input email
    cy.getCy(this.emailField).within(() => {
      cy.get('input').clear().type(email);
    });
    cy.getCy(this.emailField).invoke('val', email);

    // Change country if need be, use two letter shorts FI/US/AR/etc.
    if (country !== '') {
      cy.getCy(this.countryField).click();
      cy.getCy(this.selectCountryX + country).click();
    }

    // Clear fields and write new information
    cy.getCy(this.firstNameField).within(() => {
      cy.get('input').clear().type(firstName);
    });
    cy.getCy(this.lastNameField).within(() => {
      cy.get('input').clear().type(lastName);
    });
    cy.getCy(this.addressField).within(() => {
      cy.get('input').clear().type(address);
    });
    cy.getCy(this.cityField).within(() => {
      cy.get('input').clear().type(city);
    });
    cy.getCy(this.postalCodeField).within(() => {
      cy.get('input').clear().type(postalCode);
    });
    cy.getCy(this.phoneNumberField).within(() => {
      cy.get('input').clear().type(phone);
    });

    // Address 2 is only needed in some tests
    if (address2 !== '') {
      cy.getCy(this.address2Field).within(() => {
        cy.get('input').clear().type(address2);
      });
    }

    // State is only used on USA based addresses
    if (state !== '') {
      cy.getCy(this.stateField).click({ scrollBehavior: false });
      cy.contains(state).click({ scrollBehavior: true, force: true });
    }
  }

  checkPaymentSuccessfulText() {
    cy.getCy(this.changePaymentMethodSuccess).contains(
      this.methodChangeSuccessText,
    );
    cy.getCy(this.membershipTabElement).should('be.visible');
    cy.get(this.homeButton).should('be.visible');
    cy.getCy(this.myOrderDashElement).should('be.visible');
  }

  checkLastFourDigits(cardNumber) {
    cy.get('[class^=PaymentCardNumber_PaymentCardNumber]').contains(
      cardNumber.slice(-4),
    );
  }

  // Test functions
  checkPendingSixMonthMemebership() {
    this.assertMemberShipPage(
      'not.exist',
      'not.exist',
      'not.exist',
      'not.exist',
      'not.exist',
    );

    // Test status text
    cy.getCy(this.pendingSixMonthElement).contains(this.pendingSixMonthText);
  }

  checkPendingLifeTime() {
    this.assertMemberShipPage(
      'not.exist',
      'not.exist',
      'not.exist',
      'not.exist',
      'not.exist',
    );

    // Test status text
    cy.getCy(this.pendingLifeTimeElement).contains(this.pendingLifeTimeText);
  }

  checkPendingNoFreeTrial() {
    this.assertMemberShipPage(
      'not.exist',
      'not.exist',
      'not.exist',
      'not.exist',
      'not.exist',
    );

    // Test status text
    cy.getCy(this.pendingNoFreeTrialElement).contains(
      this.pendingNoFreeTrialText,
    );
  }

  checkActiveSixMonthTrial() {
    this.assertMemberShipPage(
      'not.exist',
      'be.visible',
      'be.visible',
      'be.visible',
      'be.visible',
    );

    // Assert status text and price info
    cy.getCy(this.activeSixMonthTrialElement).contains(
      this.activeSixMonthTrialText,
    );
    cy.getCy(this.sormusPrice).should('be.visible');
  }

  checkActiveSixMonthTrialNoPayment() {
    this.assertMemberShipPage(
      'be.visible',
      'not.exist',
      'be.visible',
      'not.exist',
      'not.exist',
    );

    // Test status text
    cy.getCy(this.activeSixMonthTrialNoPaymentElement).contains(
      this.activeSixMonthTrialNoPaymentText,
    );
  }

  checkActiveLifeTimeSub() {
    this.assertMemberShipPage(
      'not.exist',
      'not.exist',
      'be.visible',
      'not.exist',
      'not.exist',
    );

    // Test status text
    cy.getCy(this.activeLifeTimeSubElement).contains(
      this.activeLifeTimeSubText,
    );
  }

  checkActiveSub() {
    this.assertMemberShipPage(
      'not.exist',
      'be.visible',
      'be.visible',
      'be.visible',
      'be.visible',
    );

    // Test status text
    cy.getCy(this.activeSubElement).contains(this.activeSubText);
    cy.getCy(this.sormusPrice).should('be.visible');
  }

  checkExpiredTrial() {
    this.assertMemberShipPage(
      'not.exist',
      'not.exist',
      'not.exist',
      'not.exist',
      'not.exist',
      'be.visible',
    );

    // Renew text
    cy.getCy(this.expiredSubElement).contains(this.expiredTrialText);
  }

  checkNoSubFound() {
    this.assertMemberShipPage(
      'not.exist',
      'not.exist',
      'not.exist',
      'not.exist',
      'not.exist',
    );

    // Test status text
    cy.getCy(this.noSubFoundSelector).contains(this.noSubFoundText);
  }

  checkErrorFromBackEnd() {
    this.assertMemberShipPage(
      'not.exist',
      'not.exist',
      'not.exist',
      'not.exist',
      'not.exist',
    );

    // Test status text
    cy.get('div[class^=' + this.errorFromBackEndElement + ']').contains(
      this.errorFromBackEndText,
    );
  }

  checkActiveb2bSub() {
    this.assertMemberShipPage(
      'not.exist',
      'not.exist',
      'not.exist',
      'not.exist',
      'not.exist',
    );

    cy.getCy(this.activeb2bSubTextElement).contains(this.activeSubText);
  }

  checkExpiredSub() {
    this.assertMemberShipPage(
      'not.exist',
      'not.exist',
      'not.exist',
      'not.exist',
      'not.exist',
    );

    cy.getCy(this.activeSubElement).contains(this.inactiveSubText);
    cy.getCy(this.renewSubButton).should('be.visible');
  }

  assertOrderPage() {
    cy.location('pathname').should('contain', '/orders');

    cy.getCy('tab-order-details').should('exist');
    cy.get(this.myAccount)
      .should('exist')
      .should('contain', this.myAccountText);
    cy.get(this.ourMission)
      .should('exist')
      .should('contain', this.ourMissionText);
  }

  assertOrderDeteils(ringSize, color) {
    if (ringSize === undefined) {
      cy.get('div.MuiInput-input').should('be.visible');
      cy.getCy('submit-size-button').should('be.visible');
    } else {
      cy.getCy('submit-size-button').should('not.exist');
      cy.get(
        'p.Typography_Typography-body__39yoA.text-inherit.text-center',
      ).should('have.text', ringSize);
    }

    //check img
    cy.get('img')
      .invoke('attr', 'src')
      .should('contain', 'cart-ring-thumb-' + color.toLowerCase());
    //check color
    cy.get('span.Typography_Typography-body__39yoA.text-inherit').should(
      'have.text',
      color,
    );
  }
}

export function getEcomApiKey() {
  console.log(Cypress.env());
  return Cypress.env('ECOM_API_KEY') || Cypress.env('graphql_api_key');
}
