import { A11yPageHelper } from '../../../support/helpers/A11yHelper';
import { stubThirdPartyRoutes } from '../../utils/utils';

const Page = new A11yPageHelper();

const BUSINESS_FLAG = 'business-page';
const NEW_DESIGN_FLAG = 'b2b-page-new-design';

describe('Community a11y', () => {
  before(() => {
    stubThirdPartyRoutes();
    Page.go(Page.businessPageUrl);
    // cy.visitWithFlags('/business', [
    //   { key: BUSINESS_FLAG, enabled: true },
    //   { key: NEW_DESIGN_FLAG, enabled: true },
    // ]);
  });

  it('contains a single "main" element', () => {
    Page.assertMainContent();
    Page.assertSingleMainLandmark();
  });

  it('has a Skip to Content link', () => {
    Page.assertSkipToContent();
  });

  it('has a single "h1" element', () => {
    Page.assertSingleH1();
  });
});
