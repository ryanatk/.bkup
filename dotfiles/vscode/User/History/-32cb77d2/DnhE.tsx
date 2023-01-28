import { ReactElement } from 'react';
import {
  BusinessBenefits,
  BusinessFeatures,
  BusinessHero,
  BusinessLearnMore,
  BusinessSolutions,
} from '../../components/pages/business';
import { HealthJourneyBanner } from '../../components/pages/_global';
import LegalFootnotes from '../../components/pages/_global/LegalFootnotes';
import { PageContainer, PageLayout } from '../../components/sormus';
import { HOW_ACCURATE_FOOTNOTE } from '../../consts/legal-footnotes';
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
        <div className="bg-sand-light h-5">
          {/* TODO: new business main nav */}
        </div>

        <BusinessHero />
        <BusinessBenefits />
        <BusinessLearnMore />
        <BusinessSolutions />
        <BusinessFeatures />

        <HealthJourneyBanner className="lg:mb-6" />
        <LegalFootnotes footnotes={[HOW_ACCURATE_FOOTNOTE]} />
      </PageContainer>
    </PageLayout>
  );
};

export default SimpleBusinessPage;
