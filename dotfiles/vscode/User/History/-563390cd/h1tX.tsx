import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { src } from '../../../utils/imageHelpers';
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
  const isMediumScreen = useMediaQuery(`(min-width: ${breakpoints.medium}px)`);

  return (
    <Section>
      <div className="mb-16">
        <Image
          src={
            isMediumScreen
              ? src('homepage/d-period-prediction-mask-images@2x', 'png')
              : src(
                  'homepage/m-period-prediction-mask-images@2x',
                  'png',
                  breakpoints.medium,
                )
          }
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
