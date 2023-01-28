import checkoutStateInitial from '../../../fixtures/checkout/checkoutStateInitial.json';
import { A11yPageHelper } from '../../../support/helpers/A11yHelper';
import { stubThirdPartyRoutes } from '../../utils/utils';

const Page = new A11yPageHelper();

describe('Checkout a11y', () => {
  before(() => {
    stubThirdPartyRoutes();
    cy.visitWithFlags(Page.checkoutPageUrl, [], checkoutStateInitial);
  });

  it('contains a single "main" element', () => {
    Page.assertMainContent();
    Page.assertSingleMainLandmark();
  });

  it('has a single "h1" element', () => {
    Page.assertSingleH1();
  });
});
