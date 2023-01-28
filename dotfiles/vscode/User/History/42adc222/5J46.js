import { A11yPageHelper } from '../../../support/helpers/A11yHelper';
import { stubThirdPartyRoutes } from '../../utils/utils';

const Page = new A11yPageHelper();

describe('Homepage a11y', () => {
  before(() => {
    stubThirdPartyRoutes();
    Page.go(Page.PreoOrderPageUrl);
  });

  it('contains a single "main" element', () => {
    Page.assertMainContent();
    Page.assertSingleMainLandmark();
  });

  it('has a single "h1" element, showing in a carousel', () => {
    Page.assertSingleH1InCarousel();
  });
});
