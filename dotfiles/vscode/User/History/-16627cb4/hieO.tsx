import BusinessAPI from '../../components/pages/business/BusinessAPI';
import BusinessBanner from '../../components/pages/business/BusinessBanner';
import BusinessBrands from '../../components/pages/business/BusinessBrands';
import BusinessCTA from '../../components/pages/business/BusinessCTA';
import BusinessEyebrowMessage from '../../components/pages/business/BusinessEyebrow';
import BusinessForResearchers from '../../components/pages/business/BusinessForResearchers';
import BusinessHRMTeams from '../../components/pages/business/BusinessHRMTeams';
import BusinessOuraTeams from '../../components/pages/business/BusinessOuraTeams';
import BusinessQuotes from '../../components/pages/business/BusinessQuotes';
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
      <BusinessBanner />
      <BusinessQuotes />
      <BusinessOuraTeams />
      <BusinessHRMTeams />
      <BusinessAPI />
      <BusinessForResearchers />
      <BusinessBrands />
      <BusinessCTA />
    </PageLayout>
  );
};

BusinessPage.pageName = 'Business';
export default BusinessPage;
