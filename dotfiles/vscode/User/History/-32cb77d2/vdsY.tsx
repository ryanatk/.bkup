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
import {
  BASED_ON_SURVEY_FOOTNOTE,
  Footnote,
  HOW_ACCURATE_FOOTNOTE,
} from '../../consts/legal-footnotes';
import { business } from '../../data-mock/page-details/business';

const useFootnotes = (): Footnote[] => {
  const footnotes: Footnote[] = [
    {
      ...BASED_ON_SURVEY_FOOTNOTE,
      marker: '1',
    },
    {
      ...HOW_ACCURATE_FOOTNOTE,
      marker: '2',
    },
  ];
  return footnotes;
};

const SimpleBusinessPage = (): ReactElement => {
  const footnotes = useFootnotes();

  return (
    <PageLayout
      headerProps={{
        className: 'bg-white',
      }}
      seoParams={{ ...business.seoParams }}
    >
      <PageContainer name="business" padding="none">
        <div className="bg-sand-light h-5">
          {/* TODO: new business header */}
        </div>

        <BusinessHero />
        <BusinessBenefits />
        <BusinessLearnMore />
        <BusinessSolutions />
        <BusinessFeatures />

        <HealthJourneyBanner className="lg:mb-6" />
        <LegalFootnotes footnotes={footnotes} />
      </PageContainer>
    </PageLayout>
  );
};

export default SimpleBusinessPage;
