import { t } from '../../../public/locales/LocaleContext';
import { Grid, Image } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import SlideshowKolme from '../../sormus/SlideshowKolme';
import { Em, Slide, Subtitle, Title, useSlideChange } from './components';

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

interface Props {}

const ExperienceCycle = ({}: Props): JSX.Element => {
  const onSlideChange = useSlideChange('experience-cycle');

  return (
    <div>
      <div className="mb-16">
        <Image
          className="object-cover w-screen h-full"
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

      <Grid className="mb-16">
        <Title>
          {t('experience_cycle_title', {
            em: <Em>{t('experience_cycle_title.em')}</Em>,
          })}
        </Title>

        <Subtitle>{t('experience_cycle_subtitle')}</Subtitle>
      </Grid>

      <div className="my-16">
        <SlideshowKolme
          items={SLIDESHOW_ITEMS}
          showDeviceWrapper={false}
          onSlideChange={onSlideChange}
          imageLoading="lazy"
          reverse
        />
      </div>
    </div>
  );
};

export default ExperienceCycle;
