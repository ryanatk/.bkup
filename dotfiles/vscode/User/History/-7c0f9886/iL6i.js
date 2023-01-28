import checkoutStateInitial from '../../../fixtures/checkout/checkoutStateInitial.json';
import { A11yPageHelper } from '../../../support/helpers/A11y';

const Page = new A11yPageHelper();
const goToCheckout = () =>
  cy.visitWithFlags(Page.checkoutPageUrl, [], checkoutStateInitial);

describe('Checkout a11y', () => {
  it('contains a single "main" element', () => {
    goToCheckout();
    Page.assertMainContent();
    Page.assertSingleMainLandmark();
  });

  it('has a single "h1" element', () => {
    goToCheckout();
    Page.assertSingleH1();
  });
});
