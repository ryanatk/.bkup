import { t } from '../../../public/locales/LocaleContext';
import Icon from '../../../svg/readiness-icon.svg';
import { Waypoint } from '../../sormus';
import SlideshowKolme from '../../sormus/SlideshowKolme';
import { Em, Header, Section, Slide } from './components';
import { useSlideChange } from './hooks';

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
  const onSlideChange = useSlideChange('experience-readiness');

  return (
    <Section padTop>
      <Header
        title={t('experience_readiness_title', {
          em: <Em>{t('experience_readiness_title.em')}</Em>,
        })}
        subtitle={t('experience_readiness_subtitle')}
        icon={Icon}
        iconLabel="Readiness"
      />

      <Waypoint onEnter={onWaypointEnter}>
        <SlideshowKolme
          items={SLIDESHOW_ITEMS}
          showDeviceWrapper={false}
          onSlideChange={onSlideChange}
          imageLoading="lazy"
        />
      </Waypoint>
    </Section>
  );
};

export default ExperienceReadiness;
