import { SetStateAction, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { ACTIVE_EXPERIMENT_ID } from '../../../consts/experiments/accolades';
import ScrollTeaserProvider from '../../../contexts/ScrollTeaserProvider';
import { t } from '../../../public/locales/LocaleContext';
import { PageContainer } from '../../sormus';
import GoogleOptimize, { VariantId } from '../../sormus/GoogleOptimize';
import BilboAccolades from '../bilbo/BilboAccolades';
import BilboDailyScores from '../bilbo/BilboDailyScores';
import BilboExpandingAnimation from '../bilbo/BilboExpandingAnimation';
import BilboGetYoursBanner from '../bilbo/BilboGetYoursBanner';
import BilboGuidedSessions from '../bilbo/BilboGuidedSessions';
import BilboHeartMonitoring from '../bilbo/BilboHeartMonitoring';
import BilboProductCloseup from '../bilbo/BilboProductCloseup';
import BilboReadinessSequence from '../bilbo/BilboReadinessSequence';
import BilboRespondsToYou from '../bilbo/BilboRespondsToYou';
import BilboSleepAccuracy from '../bilbo/BilboSleepAccuracy';
import BilboTempSensors from '../bilbo/BilboTempSensors';
import { Hero } from './Hero';

interface AccoladesTestProps {
  children: any;
  variant: VariantId.Zero | VariantId.One;
}

const AccoladesTest = ({ children, variant }: AccoladesTestProps) => (
  <GoogleOptimize
    experimentName="Accolades logo reposition"
    experimentId={ACTIVE_EXPERIMENT_ID}
    featureFlag="accolades-logos-test"
    variant={variant}
  >
    {children}
  </GoogleOptimize>
);

interface HomeProps {
  headerHeight: number;
  setDynamicPageClasses: (value: SetStateAction<string>) => void;
}

const HomePage = ({ headerHeight, setDynamicPageClasses }: HomeProps) => {
  const [playExpandingAnimation, setPlayExpandingAnimation] = useState(false);

  return (
    <ScrollTeaserProvider text={t('meet_oura_ring_scroll_to_discover')}>
      <PageContainer name="pre-order" padding="none" className="bg-transparent">
        <Hero headerHeight={headerHeight} />

        <div className="py-10 lg:py-20 bg-helsinkiBlue-light text-white relative">
          <BilboDailyScores />
        </div>

        <div className="py-10 lg:py-20 bg-helsinkiBlue-dark text-white">
          <BilboProductCloseup />
        </div>

        <AccoladesTest variant={VariantId.One}>
          <div className="py-10 lg:py-20 bg-white">
            <BilboAccolades isABTest={true} />
          </div>
        </AccoladesTest>

        <div className="py-10 lg:py-20" id="feat-sleep_analysis">
          <BilboSleepAccuracy
            title="home_sleep_accuracy_title"
            intro="home_sleep_accuracy_intro"
            showFeatureHighlights
            setDynamicPageClasses={setDynamicPageClasses}
            showAnimation={false}
          />
        </div>

        <div className="py-10 lg:py-20" id="feat-heart_rate_monitoring">
          <BilboHeartMonitoring
            title="heartrate_monitoring_title"
            intro="heartrate_monitoring_intro_variant"
            showRestorative
            setDynamicPageClasses={setDynamicPageClasses}
          />
        </div>

        <div className="relative z-50">
          <BilboReadinessSequence />

          <div className="py-10 lg:py-20" id="feat-temperature_sensors">
            <BilboTempSensors
              setDynamicPageClasses={setDynamicPageClasses}
              featureCollageMainImage="homepage/m-body-temp@2x"
              featureCollageMainImageDesktop="homepage/d-body-temp@2x"
            />
          </div>

          <div className="py-10 lg:py-20" id="feat-responds-to-you">
            <BilboRespondsToYou setDynamicPageClasses={setDynamicPageClasses} />
          </div>

          <div className="bg-plum">
            <Waypoint
              scrollableAncestor={window}
              bottomOffset="20%"
              topOffset="60%"
              onEnter={() => setPlayExpandingAnimation(true)}
              onLeave={() => setPlayExpandingAnimation(false)}
            >
              <div>
                <BilboExpandingAnimation playVideo={playExpandingAnimation} />
              </div>
            </Waypoint>
          </div>

          <div className="py-10 lg:py-20" id="feat-guided_sessions">
            <BilboGuidedSessions
              setDynamicPageClasses={setDynamicPageClasses}
              title="guided_sessions_title_variant"
            />
          </div>

          <AccoladesTest variant={VariantId.Zero}>
            <div className="bg-helsinkiBlue-dark py-10 lg:py-20">
              <BilboAccolades />
            </div>
          </AccoladesTest>

          <div>
            <BilboGetYoursBanner
              subcopy={t('bilbo_get_yours_banner_preorder_subcopy', {
                action: t('buy'),
              })}
              buttonText={t('bilbo_get_yours_banner_variant_button_text')}
            />
          </div>
        </div>
      </PageContainer>
    </ScrollTeaserProvider>
  );
};

export default HomePage;
