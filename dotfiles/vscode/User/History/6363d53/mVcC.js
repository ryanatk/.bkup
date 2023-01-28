import { orderSummaryState } from '../../../fixtures/fakeState/orderSummaryState';
import { A11yPageHelper } from '../../../support/helpers/A11y';
// import { stubThirdPartyRoutes } from '../../utils/utils';

const Page = new A11yPageHelper();
const goToSummary = () =>
  cy.visitWithFlags(Page.summaryPageUrl, [], orderSummaryState);

describe('Checkout Summary a11y', () => {
  before(() => {
    // stubThirdPartyRoutes();
  });

  it('contains a single "main" element', () => {
    cy.setCookie('discount-token', '');
    goToSummary();
    Page.assertMainContent();
    Page.assertSingleMainLandmark();
  });

  it('has a single "h1" element', () => {
    cy.setCookie('discount-token', '');
    goToSummary();
    Page.assertSingleH1();
  });
});
