import { A11yPageHelper } from '../../../support/helpers/A11y';

const Page = new A11yPageHelper();
const goToSummary = () => cy.visit(Page.summaryPageUrl);

describe('Checkout Summary a11y', () => {
  it('contains a single "main" element', () => {
    goToSummary();
    Page.assertMainContent();
    Page.assertSingleMainLandmark();
  });

  it('has a single "h1" element', () => {
    goToSummary();
    Page.assertSingleH1();
  });
});
