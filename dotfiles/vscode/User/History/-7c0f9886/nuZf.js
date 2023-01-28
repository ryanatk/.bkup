import { A11yPageHelper } from '../../../support/helpers/A11y';

const Page = new A11yPageHelper();

describe('Checkout a11y', () => {
  before(() => {
    Page.go(Page.checkoutPageUrl);
  });

  it('contains a single "main" element', () => {
    Page.assertMainContent();
    Page.assertSingleMainLandmark();
  });

  it('has a single "h1" element', () => {
    Page.assertSingleH1();
  });
});
