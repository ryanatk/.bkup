import { ReactElement } from 'react';
import {
  BusinessBenefits,
  BusinessFeatures,
  BusinessHero,
  BusinessLearnMore,
  BusinessSolutions,
} from '../../components/pages/business';
import { HealthJourneyBanner } from '../../components/pages/_global';
import { PageContainer, PageLayout } from '../../components/sormus';
import { business } from '../../data-mock/page-details/business';

const SimpleBusinessPage = (): ReactElement => {
  return (
    <PageLayout
      headerProps={{
        className: 'bg-white',
      }}
      seoParams={{ ...business.seoParams }}
    >
      <PageContainer name="business" padding="none">
        <BusinessHero />
        <BusinessBenefits />
        <BusinessLearnMore />
        <BusinessSolutions />
        <BusinessFeatures />

        <HealthJourneyBanner className="lg:mb-6" />
      </PageContainer>
    </PageLayout>
  );
};

export default SimpleBusinessPage;
