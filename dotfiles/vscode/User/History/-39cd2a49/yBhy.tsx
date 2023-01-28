import { useRouter } from 'next/router';
import { EventType, sendGTMWithSegmentEvent } from '../../../analytics';
import { t } from '../../../public/locales/LocaleContext';
import { Grid, Waypoint } from '../../sormus';
import SlideshowKolme from '../../sormus/SlideshowKolme';
import { Em, Section, Slide, Subtitle, Title } from './components';

interface Props {
  onWaypointEnter: () => void;
}

const SLIDESHOW_ITEMS = [
  {
    shortSrc: 'product/bilbo/oura_difference_heartrate.jpg',
    width: 600,
    alt: 'Man with Oura stealth ring on index finger',
    content: () =>
      Slide({
        title: t('pdp_heart_rate'),
        paragraphs: [
          t('pdp_heart_rate_paragraph_1'),
          t('pdp_heart_rate_paragraph_2'),
        ],
      }),
  },
  {
    shortSrc: 'product/bilbo/oura_difference_temperature.jpg',
    width: 600,
    alt: 'Woman with Oura silver ring on index finger',
    content: () =>
      Slide({
        title: t('meet_oura_ring_body_temperature'),
        paragraphs: [
          t('pdp_body_temperature_paragraph_1'),
          t('pdp_body_temperature_paragraph_2'),
        ],
      }),
  },
];

const ExperienceReadiness = ({ onWaypointEnter }: Props): JSX.Element => {
  const { asPath } = useRouter();

  return (
    <Section>
      <Grid className="mb-16">
        <Title>
          {t('experience_readiness_title', {
            em: <Em>{t('experience_readiness_title.em')}</Em>,
          })}
        </Title>

        <Subtitle>{t('experience_readiness_subtitle')}</Subtitle>
      </Grid>

      <Waypoint onEnter={onWaypointEnter}>
        <SlideshowKolme
          items={SLIDESHOW_ITEMS}
          showDeviceWrapper={false}
          onSlideChange={(index: number) => {
            sendGTMWithSegmentEvent({
              type: EventType.ModuleClicked,
              payload: {
                location: 'pdp_oura_difference',
                cta: `slide-${index}`,
                path: asPath,
              },
            });
          }}
          imageLoading="lazy"
        />
      </Waypoint>
    </Section>
  );
};

export default ExperienceReadiness;
