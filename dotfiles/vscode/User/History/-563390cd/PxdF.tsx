import { t } from '../../../public/locales/LocaleContext';
import { Image } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import SlideshowKolme from '../../sormus/SlideshowKolme';
import { Em, Header, Section, Slide } from './components';
import { useSlideChange } from './hooks';

const SLIDESHOW_ITEMS = [
  {
    shortSrc: 'product/bilbo/oura_difference_heartrate.jpg',
    width: 600,
    alt: 'Man with Oura stealth ring on index finger',
    content: () =>
      Slide({
        title: t('experience_cycle_slide_1_title'),
        paragraphs: [t('experience_cycle_slide_1_body')],
      }),
  },
  {
    shortSrc: 'product/bilbo/oura_difference_temperature.jpg',
    width: 600,
    alt: 'Woman with Oura silver ring on index finger',
    content: () =>
      Slide({
        title: t('experience_cycle_slide_2_title'),
        paragraphs: [t('experience_cycle_slide_2_body')],
      }),
  },
  {
    shortSrc: 'product/bilbo/oura_difference_temperature.jpg',
    width: 600,
    alt: 'Woman with Oura silver ring on index finger',
    content: () =>
      Slide({
        title: t('experience_cycle_slide_3_title'),
        paragraphs: [t('experience_cycle_slide_3_body')],
      }),
  },
];

const ExperienceCycle = (): JSX.Element => {
  const onSlideChange = useSlideChange('experience-cycle');

  return (
    <Section>
      <div className="mb-16">
        <Image
          shortSrc="homepage/m-period-prediction-mask-images@2x.png"
          responsiveImages={[
            {
              shortSrc: 'homepage/m-period-prediction-mask-images@2x.png',
              width: breakpoints.medium,
            },
            {
              shortSrc: 'homepage/d-period-prediction-mask-images@2x.png',
              width: 2160,
            },
          ]}
          sizes={`(max-width: ${breakpoints.medium}px ${breakpoints.medium}px), 100vw`}
          alt=""
          loading="lazy"
        />
      </div>

      <Header
        title={t('experience_cycle_title', {
          em: <Em>{t('experience_cycle_title.em')}</Em>,
        })}
        subtitle={t('experience_cycle_subtitle')}
      />

      <div className="mt-16">
        <SlideshowKolme
          items={SLIDESHOW_ITEMS}
          showDeviceWrapper={false}
          onSlideChange={onSlideChange}
          imageLoading="lazy"
          reverse
        />
      </div>
    </Section>
  );
};

export default ExperienceCycle;
