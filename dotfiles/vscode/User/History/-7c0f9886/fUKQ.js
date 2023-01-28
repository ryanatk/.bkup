import checkoutStateInitial from '../../../fixtures/checkout/checkoutStateInitial.json';
import { A11yPageHelper } from '../../../support/helpers/A11y';
import { stubThirdPartyRoutes } from '../../utils/utils';

const Page = new A11yPageHelper();
const goToPage = () =>
  cy.visitWithFlags(Page.checkoutPageUrl, [], checkoutStateInitial);

describe('Checkout a11y', () => {
  before(() => {
    stubThirdPartyRoutes();
  });

  it('contains a single "main" element', () => {
    goToPage();
    Page.assertMainContent();
    Page.assertSingleMainLandmark();
  });

  it('has a single "h1" element', () => {
    goToPage();
    Page.assertSingleH1();
  });
});
