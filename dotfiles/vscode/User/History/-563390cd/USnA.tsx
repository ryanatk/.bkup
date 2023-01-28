import { FormattedMessage } from 'react-intl';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { src } from '../../../utils/imageHelpers';
import { Image } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import SlideshowKolme from '../../sormus/SlideshowKolme';
import { Em, Header, Section } from './components';
import { CYCLE_SLIDESHOW_ITEMS } from './data';
import { useSlideChange } from './hooks';

const ExperienceCycle = (): JSX.Element => {
  const onSlideChange = useSlideChange('experience-cycle');
  const isMediumScreen = useMediaQuery(`(min-width: ${breakpoints.medium}px)`);

  return (
    <Section id="cycle">
      <div className="mb-11 lg:mb-20 lg:mt-6 mx-4 lg:mx-16">
        <Image
          src={
            isMediumScreen
              ? src('experience/d-period-prediction-mask-images@2x', 'png')
              : src(
                  'experience/m-period-prediction-mask-images-oe@2x',
                  'png',
                  breakpoints.medium,
                )
          }
          alt=""
          loading="lazy"
        />
      </div>

      <Header
        title={
          <FormattedMessage
            id="experience_cycle_title"
            values={{
              i(chunks) {
                return <Em>{chunks}</Em>;
              },
            }}
          />
        }
        subtitle={t('experience_cycle_subtitle')}
      />

      <div className="mt-16">
        <SlideshowKolme
          items={CYCLE_SLIDESHOW_ITEMS}
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
