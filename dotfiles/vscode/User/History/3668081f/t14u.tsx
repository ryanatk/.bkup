import { useMemo } from 'react';
import AppFeature from '../components/pages/home/AppFeature';
import Hero from '../components/pages/home/Hero/Hero';
import LearnMore from '../components/pages/home/LearnMore';
import Mission from '../components/pages/home/Mission';
import ProductFeature from '../components/pages/home/ProductFeature';
import Stories from '../components/pages/home/Stories';
import { useTextOfCTATest } from '../components/pages/home/useTextOfCTATest';
import { HealthJourneyBanner } from '../components/pages/shared';
import {
  AffirmMessage,
  ExpeditedShippingMessage,
  GucciMessage,
  JapanMessage,
} from '../components/pages/shared/EyebrowMessage';
import HeaderTest from '../components/pages/shared/HeaderTest';
import LegalFootnotes from '../components/pages/shared/LegalFootnotes';
import {
  AccoladesMarquee,
  PageContainer,
  PageLayout,
} from '../components/sormus';
import { EyebrowProps } from '../components/sormus/Eyebrow';
import {
  Footnote,
  HOW_ACCURATE_FOOTNOTE,
  MOTHERS_DAY_FOOTNOTE,
  SLEEP_ALGORITHM_FOOTNOTE,
} from '../consts/legal-footnotes';
import home from '../data-mock/page-details/home';
import useDisplayAffirm from '../hooks/useDisplayAffirm';
import useGeolocation from '../hooks/useGeolocation';
import useHeroHeader from '../hooks/useHeroHeader';
import { t } from '../public/locales/LocaleContext';
import checkFeatureFlag from '../utils/checkFeatureFlag';
/**
 * This export of getServerSideProps is important for internationalized subpath routing.
 * DO NOT REMOVE
 */
export { getServerSideProps } from '../utils/addURLSubpathForLocale';

const useFootnotes = (): Footnote[] => {
  const mothersDayEnabled = checkFeatureFlag('mothers-day-2022');
  const footnotes: Footnote[] = [
    SLEEP_ALGORITHM_FOOTNOTE,
    HOW_ACCURATE_FOOTNOTE,
  ];
  if (mothersDayEnabled) footnotes.push(MOTHERS_DAY_FOOTNOTE);
  return footnotes;
};

export const Home = (): JSX.Element => {
  const { headerHeight, headerRef, updateHeaderHeight } = useHeroHeader();
  const footnotes = useFootnotes();
  // this test is running only in U.S.
  const isAffirmPromoEnabled = checkFeatureFlag('affirm-homepage-promo');
  const isGucciPromoEnabled = checkFeatureFlag('enable-gucci-banner');
  const isJapanPromoEnabled = checkFeatureFlag('enable-japan-eyebrow');
  const isMissionSectionEnabled = checkFeatureFlag('enable-hp-mission-section');
  const isExpeditedShippingPromoEnabled = checkFeatureFlag(
    'enable-expedited-shipping-banner',
  );

  const isAffirmCountry = useDisplayAffirm();
  const isJapan = useGeolocation('JP');
  const { ready, label } = useTextOfCTATest();

  const eyebrowProps = useMemo((): EyebrowProps => {
    if (isAffirmPromoEnabled && isAffirmCountry) {
      return {
        displayMessage: AffirmMessage,
      };
    }
    if (isJapanPromoEnabled && isJapan) {
      return {
        className: 'bg-helsinkiBlue',
        displayMessage: JapanMessage,
      };
    }
    if (isExpeditedShippingPromoEnabled) {
      return {
        className: 'bg-black',
        displayMessage: ExpeditedShippingMessage,
      };
    }
    if (isGucciPromoEnabled) {
      return {
        className: 'bg-gucciBurgundy',
        displayMessage: GucciMessage,
      };
    }
    return null;
  }, [
    isAffirmCountry,
    isAffirmPromoEnabled,
    isJapanPromoEnabled,
    isJapan,
    isGucciPromoEnabled,
    isExpeditedShippingPromoEnabled,
  ]);

  return (
    <PageLayout
      className="bg-sand"
      headerProps={{
        ref: headerRef,
        onHeaderUpdate: updateHeaderHeight,
        eyebrowProps,
      }}
      seoParams={home.seoParams}
      Header={HeaderTest}
    >
      <PageContainer padding="none" name="home">
        <h1 className="sr-only">{t('simple_home_h1')}</h1>
        <Hero headerHeight={headerHeight} />
        <div className="relative z-10">
          <ProductFeature />
          <div className="bg-sand relative z-10">
            <AccoladesMarquee />
            <AppFeature />
            {isMissionSectionEnabled && <Mission />}
            <Stories />
            <LearnMore />
            {ready && <HealthJourneyBanner cta={label} />}
            <LegalFootnotes footnotes={footnotes} />
          </div>
        </div>
      </PageContainer>
    </PageLayout>
  );
};

Home.pageName =
  'Oura Ring | Accurate Health Information Accessible to Everyone';

export default Home;
