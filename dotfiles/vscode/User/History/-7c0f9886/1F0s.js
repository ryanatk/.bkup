// import ringConfigs from '../../../fixtures/testConfigs/ringTestConfigs';
import checkoutStateInitial from '../../../fixtures/checkout/checkoutStateInitial.json';
import { A11yPageHelper } from '../../../support/helpers/A11y';
// import { CartPageHelper } from '../../../support/helpers/CartPage';
// import { CheckoutPageHelper } from '../../../support/helpers/CheckoutPage';
// import { ProductPageHelper } from '../../../support/helpers/ProductPage';

// const ProductPage = new ProductPageHelper();
// const CartPage = new CartPageHelper();
// const CheckoutPage = new CheckoutPageHelper();
const Page = new A11yPageHelper();

// const { ring, model, modelUrl, productPageIcon } = ringConfigs[0];

const flags = [
  {
    key: 'expedited-shipping',
    enabled: true,
  },
  {
    key: 'address-verification',
    enabled: false,
  },
  {
    key: 'zuora-set-agreement',
    enabled: true,
  },
  {
    key: 'show-affirm',
    enabled: true,
  },
  {
    key: 'affirm-subscription',
    enabled: true,
  },
  {
    key: 'show-paypal',
    enabled: true,
  },
  {
    key: 'membership-price-test',
    enabled: false,
  },
];

describe('Checkout a11y', () => {
  before(() => {
    // ProductPage.go();
    // ProductPage.addRingToCart(ring, model, modelUrl, productPageIcon);
    // CartPage.clickCheckoutBottomButton();
    // CheckoutPage.assertPage();
  });

  // it('contains a single "main" element', () => {
  //   Page.assertMainContent();
  //   Page.assertSingleMainLandmark();
  // });

  it('has a single "h1" element', () => {
    cy.visitWithFlags('/checkout', flags, checkoutStateInitial);
    Page.assertSingleH1();
  });
});
