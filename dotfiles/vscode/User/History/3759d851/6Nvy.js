import { A11yPageHelper } from '../../../support/helpers/A11y';
import { stubThirdPartyRoutes } from '../../utils/utils';

const Page = new A11yPageHelper();

describe('Community a11y', () => {
  before(() => {
    stubThirdPartyRoutes();
    Page.go(Page.communityPageUrl);
  });

  it('contains a single "main" element', () => {
    Page.assertMainContent();
    Page.assertSingleMainLandmark();
  });

  it('has a single "h1" element', () => {
    Page.assertSingleH1();
  });
});
