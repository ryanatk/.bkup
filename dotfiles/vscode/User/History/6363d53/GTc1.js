import { orderSummaryState } from '../../../fixtures/fakeState/orderSummaryState';
import { A11yPageHelper } from '../../../support/helpers/A11y';
import { stubThirdPartyRoutes } from '../../utils/utils';

const Page = new A11yPageHelper();
const goToPage = () =>
  cy.visitWithFlags(Page.summaryPageUrl, [], orderSummaryState);

describe('Checkout Summary a11y', () => {
  before(() => {
    stubThirdPartyRoutes();
  });

  beforeEach(() => {
    cy.setCookie('discount-token', '');
    goToPage();
  });

  it('contains a single "main" element', () => {
    Page.assertMainContent();
    Page.assertSingleMainLandmark();
  });

  it('has a single "h1" element', () => {
    Page.assertSingleH1();
  });
});
