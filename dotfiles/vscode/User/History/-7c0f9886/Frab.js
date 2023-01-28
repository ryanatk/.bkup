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
    cy.visitWithFlags('/checkout', [], checkoutStateInitial);
    Page.assertSingleH1();
  });
});
