import {
  ExperienceActivity,
  ExperienceCounter,
  ExperienceCycle,
  ExperienceHero,
  ExperienceReadiness,
  ExperienceRelax,
  ExperienceRest,
  ExperienceSleep,
  ExperienceStyle,
} from '../../components/pages/experience';
import { HealthJourneyBanner } from '../../components/pages/_global';
import LegalFootnotes from '../../components/pages/_global/LegalFootnotes';
import {
  AccoladesMarquee,
  PageContainer,
  PageLayout,
  ScrollTeaser,
  Waypoint,
} from '../../components/sormus';
import {
  Footnote,
  VALIDATION_PSG_FOOTNOTE,
} from '../../consts/legal-footnotes';
import ouraExperience from '../../data-mock/page-details/oura-experience';
import { usePageState } from '../../hooks/usePageState';
import getPDPUrl from '../../utils/getPDPUrl';

const useFootnotes = (): Footnote[] => {
  const footnotes: Footnote[] = [VALIDATION_PSG_FOOTNOTE];
  return footnotes;
};

export const Experience = (): JSX.Element => {
  const { dynamicPageClasses, setDynamicPageClasses, headerRef } = usePageState(
    { initClassName: 'bg-sand' },
  );
  const footnotes = useFootnotes();

  return (
    <PageLayout
      className={`transition-colors duration-200 ${dynamicPageClasses}`}
      headerProps={{
        bordered: true,
        ref: headerRef,
      }}
      seoParams={{ ...ouraExperience.seoParams }}
    >
      <PageContainer name="experience" padding="none">
        {/* Hero */}
        <Waypoint
          onEnter={() => setDynamicPageClasses('bg-sand text-grayMedium')}
          topOffset="1000px"
        >
          <div className="bg-sand text-grayMedium">
            <ExperienceHero />
            <ScrollTeaser outline />
          </div>
        </Waypoint>

        {/* Sleep */}
        <Waypoint
          onEnter={() => setDynamicPageClasses('bg-plum-dark text-gray-200')}
        >
          <div>
            <ExperienceSleep
              onWaypointEnter={() =>
                setDynamicPageClasses('bg-helsinkiBlue-dark text-gray-200')
              }
            />
          </div>
        </Waypoint>

        {/* Activity */}
        <Waypoint
          onEnter={() =>
            setDynamicPageClasses('bg-dawnBlue text-helsinkiBlue-dark')
          }
        >
          <ExperienceActivity
            onWaypointEnter={() =>
              setDynamicPageClasses('bg-purpleRain text-helsinkiBlue-dark')
            }
          />
        </Waypoint>

        {/* Counter */}
        <ExperienceCounter />

        {/* Readiness */}
        <Waypoint
          onEnter={() =>
            setDynamicPageClasses('bg-morningLight text-grayMedium')
          }
        >
          <ExperienceReadiness />
        </Waypoint>

        {/* Cycle & Rest */}
        <Waypoint
          onEnter={() => setDynamicPageClasses('bg-goldenHour text-grayMedium')}
        >
          <ExperienceCycle />
          <ExperienceRest />
        </Waypoint>

        {/* Relax */}
        <Waypoint
          onEnter={() =>
            setDynamicPageClasses('bg-dawnBlue-light text-helsinkiBlue-dark')
          }
        >
          <ExperienceRelax />
        </Waypoint>

        {/* Style */}
        <Waypoint
          onEnter={() =>
            setDynamicPageClasses('bg-purpleRain text-helsinkiBlue-dark')
          }
        >
          <ExperienceStyle shopNow={getPDPUrl()} />
        </Waypoint>

        {/* Accolades & Footer */}
        <AccoladesMarquee dark />
        <HealthJourneyBanner className="bg-sand lg:pt-6" />
        <LegalFootnotes footnotes={footnotes} />
      </PageContainer>
    </PageLayout>
  );
};

Experience.pageName = 'Experience';
Experience.isSormusCompatible = true;

export default Experience;
