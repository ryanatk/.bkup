import { A11yPageHelper } from '../../../support/helpers/A11y';
import { stubThirdPartyRoutes } from '../../utils/utils';

const Page = new A11yPageHelper();
const goToSummary = () =>
  cy.visit(Page.summaryPageUrl, {
    onBeforeLoad: (win) => {
      win.initialState = orderSummaryState;
    },
  });

describe('Checkout Summary a11y', () => {
  before(() => {
    stubThirdPartyRoutes();
  });

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
