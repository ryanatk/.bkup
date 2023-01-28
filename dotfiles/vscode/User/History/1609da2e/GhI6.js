import { A11yPageHelper } from '../../../support/helpers/A11yHelper';
import { stubThirdPartyRoutes } from '../../utils/utils';

const Page = new A11yPageHelper();

describe('My Account Orders a11y', () => {
  before(() => {
    stubThirdPartyRoutes();
    Page.go(Page.myAccountOrderPageUrl);
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
