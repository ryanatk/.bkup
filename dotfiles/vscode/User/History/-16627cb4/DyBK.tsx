import BusinessEyebrowMessage from '../../components/pages/business/BusinessEyebrow';
import { PageLayout } from '../../components/sormus';
import { business } from '../../data-mock/page-details/business';
import checkFeatureFlag from '../../utils/checkFeatureFlag';

const BusinessPage = () => {
  const businessEyebrowEnabled = checkFeatureFlag('business-page-eyebrow');

  return (
    <PageLayout
      headerProps={{
        className: 'bg-sand-light',
        eyebrowProps: {
          displayMessage: businessEyebrowEnabled && BusinessEyebrowMessage,
        },
      }}
      seoParams={{ ...business.seoParams }}
    >
      {/* <BusinessBanner /> */}
      {/* <BusinessQuotes /> */}
      {/* <BusinessOuraTeams /> */}
      {/* <BusinessHRMTeams /> */}
      {/* <BusinessAPI /> */}
      {/* <BusinessForResearchers /> */}
      {/* <BusinessBrands /> */}
      {/* <BusinessCTA /> */}
    </PageLayout>
  );
};

BusinessPage.pageName = 'Business';
export default BusinessPage;
