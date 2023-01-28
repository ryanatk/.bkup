import { stubThirdPartyRoutes } from '../../utils/utils';
import { erroredState } from '../../../fixtures/fakeState/discountError';
import discountsState from '../../../fixtures/discount/discountsState.json';
import { CheckoutPageHelper } from '../../../support/helpers/CheckoutPage';
import USAppState from '../../../fixtures/testConfigs/USAppState';

const VALID_CODE = 'yvonne';
const INVALID_CODE = 'not-a-discount';
const SUCCESS_MESSAGE =
  'YOUR DISCOUNT HAS BEEN APPLIED TO YOUR CART AND WILL EXPIRE IN 30 MINUTES.';
const ERROR_MESSAGE = 'DISCOUNT LINK IS NOT VALID.';
const DISCOUNT_PRICE = '$214';
const FULL_PRICE = '$299';
const FREE_SHIPPING_MESSAGE = 'FREE';
const DISCOUNT_ORDER_TOTAL_FREE_SHIPPING = '$228.98';
const DISCOUNT_ORDER_TOTAL_NO_FREE_SHIPPING = '$245.03';
const GOLLUM_MESSAGE = 'GUCCI x ŌURA has arrived.';

const CheckoutPage = new CheckoutPageHelper();

const inputUserInformation = () => {
  const email = `cypress+${Math.floor(Date.now())}@ouraring.com`;
  const cardHolder = 'Cypress';
  const card = 'Visa';
  const address = 'Test St 19';
  const address2 = '';
  const city = 'Test York';
  const postalCode = '33142';
  const phoneNumber = '0201231234';
  const state = discountsState.app.countryCode === 'US' ? 'Florida' : '';
  const country = discountsState.app.countryCode;
  cy.wait(1500);
  CheckoutPage.inputUserInformation(
    email,
    cardHolder,
    card,
    address,
    address2,
    city,
    postalCode,
    phoneNumber,
    state,
    country,
    false,
    undefined, // no need to cut off before end
  );
};

describe('Discounts', () => {
  beforeEach(() => {
    stubThirdPartyRoutes();
  });

  context('Valid discount flow', () => {
    it('Visiting with valid discount code shows success banner and discounted prices', () => {
      cy.visit(`/discount/${VALID_CODE}`);
      cy.getCy('banner-message').contains(SUCCESS_MESSAGE);
      cy.getCy('button-add-to-cart').click();
      cy.getCy('modal-add-extended-warranty').click();
      cy.getCy('banner-message').contains(SUCCESS_MESSAGE);
      cy.getCy('price-line-item').contains(DISCOUNT_PRICE);
      cy.getCy('product-detail-regular-price').contains(FULL_PRICE);
    });

    it('Provides accurate order pricing when discount is combined with free shipping promo', () => {
      cy.visit(`/discount/${VALID_CODE}`);
      cy.getCy('button-add-to-cart').click();
      cy.getCy('modal-add-extended-warranty').click();
      cy.getCy('button-checkout').click();
      cy.visitWithFlags(
        '/checkout',
        [{ key: 'free-shipping-messaging', enabled: true }],
        discountsState,
      );
      inputUserInformation();
      cy.getCy('checkout-price').contains(DISCOUNT_PRICE);
      cy.getCy('checkout-order-discount_shipping').contains(
        FREE_SHIPPING_MESSAGE,
      );
      cy.getCy('checkout-order-total_after_tax').contains(
        DISCOUNT_ORDER_TOTAL_FREE_SHIPPING,
      );
    });

    it('Provides accurate order pricing when free shipping promo is turned off', () => {
      cy.visit(`/discount/${VALID_CODE}`);
      cy.getCy('button-add-to-cart').click();
      cy.getCy('modal-add-extended-warranty').click();
      cy.getCy('button-checkout').click();
      cy.visitWithFlags(
        '/checkout',
        [{ key: 'free-shipping-messaging', enabled: false }],
        discountsState,
      );
      inputUserInformation();
      cy.getCy('checkout-price').contains(DISCOUNT_PRICE);
      cy.getCy('checkout-order-total_after_tax').contains(
        DISCOUNT_ORDER_TOTAL_NO_FREE_SHIPPING,
      );
    });
  });

  context('Invalid discount flow', () => {
    it('Visiting with invalid discount code shows error banner and full price', () => {
      cy.visit(`/discount/${INVALID_CODE}`);
      cy.getCy('product-detail-price').should('exist');
      cy.getCy('banner-message').contains(ERROR_MESSAGE);
      cy.getCy('button-add-to-cart').click();
      cy.getCy('modal-add-extended-warranty').click();
      cy.getCy('banner-message').should('not.exist');
      cy.getCy('price-line-item').contains(FULL_PRICE);
    });
  });

  context('Valid discount re-visit scenarios', () => {
    it('Valid discount token in cookies persists discount between visits', () => {
      cy.setCookie('discount-token', VALID_CODE);
      cy.visitWithFlags(
        '/',
        [
          { key: 'extended-warranty', enabled: true },
          { key: 'show-sleep-hero-carousel', enabled: false },
          { key: 'app-lang-support-test', enabled: false },
          { key: 'affirm-homepage-promo', enabled: false },
        ],
        USAppState,
      );
      cy.getCy('banner-message').contains(SUCCESS_MESSAGE);
      cy.getCy('nav_shopcta').click();
      cy.getCy('button-add-to-cart').click();
      cy.getCy('modal-add-extended-warranty').click(); // failing
      cy.getCy('banner-message').contains(SUCCESS_MESSAGE);
      cy.getCy('price-line-item').contains(DISCOUNT_PRICE);
      cy.getCy('product-detail-regular-price').contains(FULL_PRICE);
    });
  });

  context('Invalid discount re-visit scenarios', () => {
    it('Visitng with discount error in state does not pop banner', () => {
      cy.visit('/', {
        onBeforeLoad: (win) => {
          win.initialState = erroredState;
        },
      });
      cy.getCy('banner-message').should('not.exist');
    });

    it('Visiting with expired cookie does not pop banner', () => {
      cy.setCookie('discount-token', INVALID_CODE, {
        expiry: 0,
      });
      cy.visit('/');
      cy.getCy('banner-message').should('not.exist');
    });
  });
});
