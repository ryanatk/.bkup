import { BasePageHelper } from './BasePageHelper';

export class CartPageHelper extends BasePageHelper {
  constructor() {
    super();

    // Page specific elements
    this.url = '/cart';
    this.priceElement = 'price-line-item';
    this.productTitleElement = 'product-title';
    this.productImageElement = 'product-image';
    this.cartTitleElement = 'cart-title';
    this.cartImageElement = 'link-to-cart';
    this.shopNowButton = 'button-shopnow';
    this.subscriptionAmountElement = 'cart-description-subscription-amount';
    this.subscriptionPriceElement = 'product-detail-regular-price';
    this.affirmPromoTextElement = 'affirm-promo';
    this.dutiesTextElement = 'duties-text';
    this.removeFromCartButton = 'button-remove-cart-item';
  }

  go() {
    cy.visit(this.url);
  }

  assertBottomCheckoutButton(isEnabled = true) {
    cy.getCy(this.checkoutBottomButton).should(
      isEnabled ? 'not.be.disabled' : 'be.disabled',
    );
  }

  clickCheckoutBottomButton(ringSize = undefined) {
    cy.getCy(this.checkoutBottomButton)
      .should('be.visible')
      .click({ scrollBehavior: 'bottom' });
    this.assertCheckoutPage(ringSize);
  }

  removeRingFromCart() {
    cy.getCy(this.removeFromCartButton).contains('Remove').should('be.visible');
    // Did not work without wait for reasons unknown
    cy.wait(500);
    cy.getCy(this.removeFromCartButton).click({
      force: true,
    });
    cy.getCy(this.removeFromCartButton).should('not.exist');
    cy.contains('You have no items in your cart.');
    this.assertEmptyCart();
  }

  clickShopNow() {
    cy.getCy(this.shopNowButton).should('be.visible').click();
    this.assertProductPage();
  }

  checkSubscriptionPriceAndDutiesText(countryCode) {
    const subscriptionPrice =
      countryCode === 'FI'
        ? Cypress.env('subscription_amount_eu')
        : Cypress.env('subscription_amount_us');
    var dutiesString = '';
    var existance = '';

    // Page elements depend on the country
    if (countryCode === 'US') {
      existance = 'exist';
      dutiesString =
        'Shipping and taxes will be calculated during checkout. All prices in USD.';
    } else {
      existance = 'not.exist';
      dutiesString = 'Shipping and taxes will be calculated during checkout.';
    }

    // Check elements
    cy.getCy(this.affirmPromoTextElement).should(existance);
    cy.getCy(this.subscriptionPriceElement).contains(subscriptionPrice);
    cy.getCy(this.subscriptionAmountElement).contains(subscriptionPrice);
    cy.getCy(this.dutiesTextElement).contains(dutiesString);
  }

  assertPage(model) {
    this.assertCartPage(model);
  }

  assertEmptyCart() {
    cy.getCy(this.cartTitleElement).contains('Cart').should('be.visible');
    cy.getCy(this.cartImageElement).should('not.exist');
    cy.getCy(this.priceElement).should('not.exist');
    cy.getCy(this.continueShoppingButton).should('not.exist');
    cy.getCy(this.checkoutBottomButton).should('not.exist');
    cy.get('button').contains('Remove').should('not.exist');
    cy.getCy(this.productImageElement).should('not.exist');
    cy.get('[alt=subscription]').should('not.exist');
    cy.get('[alt=sizing-kit]').should('not.exist');
    cy.getCy(this.shopNowButton).should('be.visible');
  }
}
