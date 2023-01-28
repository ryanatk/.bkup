import { BasePageHelper } from './BasePageHelper';
import { checkoutStatePaypalAuth } from '../../fixtures/checkout-new/checkoutStatePaypalAuth';
import { basicAuth } from '../../integration/utils/utils';

export class CheckoutPageHelper extends BasePageHelper {
  constructor() {
    super();

    this.url = '/checkout';

    // Intercept
    this.orderIntercept = '*/api/order';

    // Checkout Page
    this.checkoutPageElement = 'page-checkout';

    // Page specific elements(email/address inputs)
    this.emailField = 'field-email';
    this.emailConfirmField = 'field-emailConfirm';
    this.prefillEmailField = 'field-prefillEmail';
    this.firstNameField = 'field-fname';
    this.lastNameField = 'field-lname';
    this.addressField = 'field-address';
    this.address2Field = 'field-address2';
    this.cityField = 'field-city';
    this.postalCodeField = 'field-postal';
    this.phoneNumberField = 'field-phone';
    this.stateField = 'field-state';
    this.countryField = 'field-country';
    this.giftMessageField = 'field-giftMessage';

    // Gift related elements
    this.isAGiftCy = 'checkbox-checkout-is-gift';
    this.giftBillingEmail = 'checkout-billing-email-gift';
    this.giftEmailMessage = 'checkout-email-message-gift';
    this.giftEmailShippingMessage = 'checkout-shipping-address-message-gift';
    this.giftingOptionCheckbox = 'gift-options-checkbox';

    // Payment radio buttons
    this.cardPayment = 'radio-checkout-payment-braintree';
    this.paypalPayment = 'radio-checkout-payment-paypal';
    this.affirmPayment = 'radio-checkout-payment-affirm';
    this.affirmContent = 'affirm-content';
    this.affirmOneShotContent = 'affirm-oneshot-content';

    // Card payment iframe
    this.iframeBodyCard = '#z_hppm_iframe';
    this.iframeBody3ds = '#Cardinal-collector';
    this.cardHolderNameField = '#input-creditCardHolderName';
    this.cardNumberField = '#input-creditCardNumber';
    this.cvvField = '#input-cardSecurityCode';
    this.expirationMonthField = '#input-creditCardExpirationMonth';
    this.expirationYearField = '#input-creditCardExpirationYear';
    this.termsAgreementTickBox = 'input[name=checkout-agreement]';

    // ToC checkboxes
    this.checkboxToCAgreement = 'checkbox-checkout-agreement';
    this.checkboxNewsSubsciption = 'subscribe-agreement';

    // Buttons
    this.accountNextButton = 'checkout-account-next-button';
    this.giftOptionsNextButton = 'checkout-gift-options-next-button';
    this.deliveryAddressNextButton = 'checkout-delivery-next-button';
    this.shippingMethodNextButton = 'checkout-shipping-method-next-button';
    this.billingAddressNextButton = 'checkout-billing-next-button';
    this.shippingNextButton = 'button-submit-shipping-address';
    this.shippingMethodButton = 'button-submit-shipping-method';
    this.billingNextButton = 'button-submit-same-billing-address';
    this.billingDifferentAddressNextButton = 'button-submit-billing-address';
    this.submitPaymentButton = 'button-submit-payment';
    this.unrecoverableErrorRetryButton = 'button-retry-checkout';

    // General Partitions
    this.accountInfoPartition = 'checkout-step-account-info';
    this.giftingOptionsPartition = 'checkout-step-gift-options';
    this.shippingPartition = 'checkout-step-delivery-address';
    this.shipMethodPartition = 'checkout-step-shipping-method';
    this.billingPartition = 'checkout-step-billing-address';
    this.cardPartition = 'checkout-step-payment';

    // Partition edit buttons
    this.accountInfoPartitionEdit = 'checkout-step-edit-account-info';
    this.giftingOptionsPartitionEdit = 'checkout-step-edit-gift-options';
    this.shippingPartitionEdit = 'checkout-step-edit-delivery-address';
    this.shipMethodPartitionEdit = 'checkout-step-edit-shipping-method';
    this.billingPartitionEdit = 'checkout-step-edit-billing-address';
    this.paymentPartitionEdit = 'checkout-step-edit-payment';

    // Gift Options
    this.giftOptionsShipToSelf = 'checkout-gift-options-ship-self';
    this.giftOptionsGiftDelivery = 'checkout-gift-options-gift-delivery';

    // Shipping Methods
    this.standardShipping = 'checkout-shipping-method-standard-shipping';
    this.expeditedShipping = 'checkout-shipping-method-expedited-shipping';

    // Billing
    this.billingAddressSame = 'checkbox-billing-address-same';

    // Payment step
    this.affirmPaymentAlert = 'checkout-affirm-payment';
    this.paypalSuccessNotice = 'paypal-auth-success-notice';

    // Address verification popup
    this.addressVerificationPopupClose = 'modal-close';
    this.checkoutShippingPopUp = 'button-submit-verified-address';
    this.pickWrittenAddress = 'original-address';

    // Country data-cys
    this.selectCountryUS = 'formik-select-option-US';
    this.selectCountryFI = 'formik-select-option-FI';
    this.selectCountryAR = 'formik-select-option-AU';
    this.selectCountryGB = 'formik-select-option-GB';
    this.selectCountryX = 'formik-select-option-';

    // Error data-cy
    this.paymentUnrecoverableError = 'checkout-unrecoverable-error';
    this.emailGenericEmailError = 'field-error-email';
    this.emailConfirmError = 'field-error-emailConfirm';
    this.emailPartitionMissingError = 'form-error-email';
    this.emailUsedEmailError = 'checkout-step-account-info-error';
    this.shippingErrorMessage = 'checkout-step-delivery-address-error';
    this.paymentErrorMessage = 'checkout-step-payment-error';

    // Field Errors
    this.firstNameFieldError = 'field-fname-error';
    this.lastNameFieldError = 'field-lname-error';
    this.emailFieldError = 'field-email-error';
    this.addressFieldError = 'field-address-error';
    this.cityFieldError = 'field-city-error';
    this.stateFieldError = 'field-state-error';
    this.countryFieldError = 'field-country-error';
    this.postalFieldError = 'field-postal-error';
    this.phoneNumberFieldError = 'field-phone-error';

    // Click to show input
    this.clickToShowInput = 'click-to-show-input';

    // Checkout steps edit
    this.accountInfoEdit = 'account-info-edit';
    this.giftOptionsEdit = 'gift-options-edit';
    this.deliveryAddressEdit = 'delivery-address-edit';
    this.shippingMethodEdit = 'shipping-method-edit';
    this.billingAddressEdit = 'billing-address-edit';
    this.paymentEdit = 'payment-edit';

    // Checkout steps complete
    this.accountInfoComplete = 'account-info-complete';
    this.giftOptionsComplete = 'gift-options-complete';
    this.deliveryAddressComplete = 'delivery-address-complete';
    this.shippingMethodComplete = 'shipping-method-complete';
    this.billingAddressComplete = 'billing-address-complete';

    // price cys
    this.membershipPrice = 'teaser-oura-membership-amount';
    this.checkoutSubTotal = 'checkout-order-subtotal';
    this.checkoutShipping = 'checkout-order-shipping';
    this.checkoutTax = 'checkout-order-tax';
    this.checkoutTotalWTax = 'checkout-order-total_after_tax';

    // Summary
    this.summaryPageElement = 'checkout-summary-view';
    this.summaryTrialMembershipText = 'text-trial-membership';
    this.summaryConfirmationText = 'text-summary-order-confirmation';
    this.summaryGiftMessageText = 'text-gift-message';
    this.summaryNewsText = 'text-news';
    this.summaryLifetimeMembershipText = 'text-lifetime-membership';
    this.summaryTellAFriendText = 'text-tell-a-friend';
    this.summaryExpeditedShipping = 'shipping-method-4';
    this.summaryGiftMessage = 'summary-gift-message';

    // General Error Texts
    this.emailAssociatedErrorText =
      'This email is already associated with an Oura account.';
    this.emailTooLongErrorText = 'This field cannot exceed 40 characters';
    this.emailNonMatchingErrorText = 'Emails do not match.';
  }

  go() {
    cy.visit(this.url, basicAuth);
  }

  clickReturnToCart() {
    cy.location('pathname').should('equal', this.url);
    cy.contains(this.accountInfoText).should('be.visible');
    cy.get(this.sectionOrderDetailsElement).should('be.visible');
    cy.log(`return to cart tect : ${this.returnToCartText}`);
    cy.contains(this.returnToCartText).click({ scrollBehavior: 'bottom' });
    cy.location('pathname').should('equal', '/cart');
  }

  /**
   * Input given params to the shipping address partition of the checkout form.
   * Then skip the shipping method and billing address via next button.
   * Created a cutoff point for flexible use, choices:
   * 'afterEmail', 'afterShippingAdd'
   * If cut off remember to add cardDetails intercept to the test before going through billing.
   *
   * @param {string} email
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} address
   * @param {string} address2
   * @param {string} city
   * @param {string} postalCode
   * @param {string} phone
   * @param {string} state
   * @param {string} country
   * @param {boolean} shippingMethod
   * @param {string} cutOffPoint
   */
  inputUserInformation(
    email = `cypress+${Math.floor(Date.now())}@ouraring.com`,
    firstName = 'Cypress',
    lastName = 'Test',
    address = 'Test St 19',
    address2 = '',
    city = 'Test York',
    postalCode = '00666',
    phone = '0201231234',
    state = '',
    country = '',
    shippingMethod = false,
    cutOffPoint = '',
  ) {
    cy.wait(3000);

    // Input email. There are some problems with cypress filling the field. Click it before typing. Fails randomly
    if (email !== '') {
      cy.getCy(this.firstNameField).type(firstName);
      cy.getCy(this.lastNameField).type(lastName);
      cy.getCy(this.emailField).type(email);
    }

    cy.getCy(this.accountNextButton).click({ scrollBehavior: false });

    if (cutOffPoint === 'afterEmail') {
      return;
    }

    // Change country if need be, use two letter shorts FI/US/AR/etc.
    if (country !== '') {
      cy.getCy(this.countryField).select(country);
    }

    // Input shipping information
    cy.getCy(this.addressField).type(address);
    cy.getCy(this.cityField).type(city);
    cy.getCy(this.postalCodeField).type(postalCode);
    cy.getCy(this.phoneNumberField).type(phone);

    // Address 2 is only needed in some tests
    if (address2 !== '') {
      cy.getCy(this.address2Field).type(address2);
    }

    // State is only used on USA based addresses
    if (state !== '') {
      cy.getCy(this.stateField).select(state);
    }

    if (cutOffPoint === 'afterShippingAdd') {
      return;
    }

    // intercept
    cy.intercept(
      'https://sandbox.eu.zuora.com/apps/*paymentGateway=braintree*',
    ).as('cardDetailsInput');
    cy.getCy(this.deliveryAddressNextButton).click({ scrollBehavior: false });
    if (shippingMethod === true) {
      cy.getCy(this.standardShipping).click();
      cy.getCy(this.shippingMethodNextButton).click({ scrollBehavior: false });
    }

    cy.getCy(this.billingAddressNextButton).click({ scrollBehavior: false });

    cy.wait('@cardDetailsInput')
      .its('response.statusCode')
      .should('equal', 200);
  }

  /** Card payment: Fill up the card partition
   *
   * @param {string} cardHolderFirstName
   * @param {string} cardHolderLastName
   * @param {string} cardNumber
   * @param {string} cvv
   * @param {string} expMonth
   * @param {string} expYear
   */
  inputCardDetails(
    cardHolderFirstName = 'Cypress',
    cardHolderLastName = 'Visa',
    cardNumber = '4111111111111111',
    cvv = '123',
    expMonth = '01',
    expYear = '2023',
  ) {
    cy.getIframeBody(this.iframeBodyCard).within(() => {
      cy.get(this.cardHolderNameField).type(
        `${cardHolderFirstName} ${cardHolderLastName}`,
      );
      cy.get(this.cardNumberField).type(cardNumber);
      cy.get(this.cvvField).type(cvv);
      cy.get(this.expirationMonthField).select(expMonth);
      cy.get(this.expirationYearField).select(expYear);
    });
  }

  /** Payment done via paypal
   *
   */
  inputPaypalDetails() {
    // Intercepts
    cy.intercept('POST', '/graphql', (req) => {
      const { body } = req;

      // Set alias
      if (body.query.includes('query PaymentGateway')) {
        req.alias = 'PaymentGateway';

        // Send reply
        req.reply({
          data: {
            content: {
              paymentGatewayConfig: [
                {
                  gatewayName: 'affirm',
                  zuoraPaymentGateway: 'affirm_card_usd',
                  zuoraPageId: null,
                },
                {
                  gatewayName: 'paypal',
                  zuoraPaymentGateway: 'paypal_express_usd',
                  zuoraPageId: null,
                  paypalMerchantId: 'test-merchant-id',
                },
                {
                  gatewayName: 'braintree',
                  zuoraPaymentGateway: 'braintree_usd',
                  zuoraPageId: '1111',
                },
              ],
            },
          },
        });
      }
    });

    cy.intercept('POST', '/v1/api/public/paypal/setExpressCheckout', {
      status: 200,
      response: {
        url: '',
        token: '12345',
      },
    });

    cy.intercept('POST', '/api/order', {
      fixture: 'order/postOrderSuccess',
    }).as('postOrder');

    // Set paypal as payment method and check elements
    cy.getCy(this.paypalPayment).click();
    cy.get('#paypal-button').should('be.visible');
    cy.visitWithFlags(
      '/checkout?gateway=paypal_express_usd&token=EC-7X642137J40301106',
      [],
      checkoutStatePaypalAuth,
    );
    cy.wait('@PaymentGateway');
    cy.get('[data-cy="paypal-auth-success-notice"]').should('be.visible');

    // Check terms box and place order
    cy.get('input[name=checkout-agreement]').check();
    cy.getCy(this.submitPaymentButton).click({ scrollBehavior: false });
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
      'https://centinelapistag.cardinalcommerce.com/V1/Order/JWT/Continue',
    ).as('iframe');
    cy.intercept('POST', this.orderIntercept).as('orderRequest');
    cy.intercept('POST', 'https://www.recaptcha.net/recaptcha/*', {
      statusCode: 200,
    }).as('reCaptcha');

    // Check terms box and place order
    cy.get(this.termsAgreementTickBox).check();
    cy.getCy(this.submitPaymentButton).click({ scrollBehavior: false });

    // Enter 3ds information Cardinal-CCA-IFrame if in US - state is used for it
    if (state != '' && modal) {
      // Wait iframe
      cy.wait('@iframe', { timeout: 30000 })
        .its('response.statusCode')
        .should('equal', 200);
      this.inputCodeToModal();
    }

    // Wait order to go through
    cy.wait('@postOrder', { timeout: 30000 })
      .its('response.statusCode')
      .should('equal', 200);
  }

  inputCodeToModal() {
    cy.getIframeBody(this.iframeBodyCard, 15000).within(() => {
      cy.getIframeBody('#Cardinal-CCA-IFrame', 15000).within(() => {
        // Input pin
        cy.get('input[name="challengeDataEntry"]', { timeout: 15000 }).type(
          '1234',
        );

        cy.get('input[class="button primary"]').click({
          scrollBehavior: false,
        });
      });
    });
  }

  assertAffirmPayment() {
    cy.getCy(this.affirmPayment).click();
    cy.getCy(this.affirmContent).should('be.visible');
  }

  assertAffirmOneShotPayment() {
    cy.getCy(this.affirmPayment).click();
    cy.getCy(this.affirmOneShotContent).should('be.visible');
  }

  assertAffirmChargerPayment() {
    cy.getCy(this.affirmPayment).click();
    cy.getCy(this.affirmOneShotContent).should('not.exist');
    cy.getCy(this.affirmContent).should('not.exist');
  }

  verifyAutofillEmail() {
    cy.getCy(this.emailField).should('not.exist');
    cy.getCy(this.emailConfirmField).should('not.exist');
    cy.getCy(this.prefillEmailField).should('be.visible');
  }

  assertPage() {
    this.assertCheckoutPage();
  }
}
