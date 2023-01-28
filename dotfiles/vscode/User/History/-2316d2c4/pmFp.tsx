import {
  BASED_ON_SURVEY_FOOTNOTE,
  Footnote,
  HOW_ACCURATE_FOOTNOTE,
} from '../../../consts/legal-footnotes';
import home from '../../../data-mock/page-details/home';
import useDisplayAffirm from '../../../hooks/useDisplayAffirm';
import { usePageState } from '../../../hooks/usePageState';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';
import { AccoladesMarquee, PageLayout } from '../../sormus';
import { AffirmMessage, GucciMessage } from '../home/DisplayMessage';
import { HealthJourneyBanner } from '../_global';
import LegalFootnotes from '../_global/LegalFootnotes';
import AppFeature from './AppFeature';
import Hero from './Hero';
import LearnMore from './LearnMore';
import Mission from './Mission';
import ProductFeature from './ProductFeature';
import Stories from './Stories';

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

const SimpleHome = (): JSX.Element => {
  const { headerHeight, headerRef, updateHeaderHeight } = usePageState({
    featureFlag: 'enable-horizon',
  });
  const footnotes = useFootnotes();
  // this test is running only in U.S.
  const isAffirmPromoEnabled = checkFeatureFlag('affirm-homepage-promo');
  const isGucciPromoEnabled = checkFeatureFlag('enable-gucci-banner');
  const isAffirmCountry = useDisplayAffirm();
  return (
    <PageLayout
      className="bg-sand"
      headerProps={{
        bordered: false,
        onHeaderUpdate: updateHeaderHeight,
        ref: headerRef,
        eyebrowProps: {
          className:
            isAffirmPromoEnabled && isAffirmCountry ? '' : 'bg-gucciBurgundy',
          displayMessage:
            isAffirmPromoEnabled && isAffirmCountry
              ? AffirmMessage
              : isGucciPromoEnabled
              ? GucciMessage
              : null,
        },
      }}
      seoParams={home.seoParams}
    >
      <Hero headerHeight={headerHeight} />
      <div className="relative z-10">
        <Mission />
        <AccoladesMarquee />
        <ProductFeature />
        <div className="bg-sand relative z-10">
          <AppFeature />
          <Stories />
          <LearnMore />
          <HealthJourneyBanner />
          <LegalFootnotes footnotes={footnotes} />
        </div>
      </div>
    </PageLayout>
  );
};

export default SimpleHome;
