import { A11yPageHelper } from '../../../support/helpers/A11y';

const Page = new A11yPageHelper();

describe('My Orders a11y', () => {
  before(() => {
    Page.go(Page.myAccountOrderPageUrl);
  });

  it('contains a single "main" element', () => {
    Page.assertMainContent();
    Page.assertSingleMainLandmark();
  });

  it('has a single "h1" element', () => {
    Page.assertSingleH1();
  });
});
