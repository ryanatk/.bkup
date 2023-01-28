import { A11yPageHelper } from '../../../support/helpers/A11yHelper';
import { stubThirdPartyRoutes } from '../../utils/utils';

const Page = new A11yPageHelper();

describe('PDP a11y', () => {
  before(() => {
    stubThirdPartyRoutes();
    Page.go(Page.ProductPageUrl);
  });

  it('contains a single "main" element', () => {
    Page.assertMainContent();
    Page.assertSingleMainLandmark();

    const content = () =>
      product?.handle === CHARGER_SET
        ? PRODUCT_CONTENT.charger
        : PRODUCT_CONTENT.ring;
  });

  it('has a Skip to Content link', () => {
    Page.assertSkipToContent();
  });

  it('has a single "h1" element', () => {
    Page.assertSingleH1();
  });
});
