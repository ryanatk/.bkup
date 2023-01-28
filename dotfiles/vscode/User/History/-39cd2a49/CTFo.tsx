import { FormattedMessage } from 'react-intl';
import { t } from '../../../public/locales/LocaleContext';
import Icon from '../../../svg/readiness-icon.svg';
import SlideshowKolme from '../../sormus/SlideshowKolme';
import { Em, Header, Section } from './components';
import { READINESS_SLIDESHOW_ITEMS as SLIDESHOW_ITEMS } from './data';
import { useSlideChange } from './hooks';

const ExperienceReadiness = (): JSX.Element => {
  const onSlideChange = useSlideChange('experience-readiness');

  return (
    <Section padTop id="readiness">
      <Header
        title={
          <FormattedMessage
            id="experience_readiness_title"
            values={{
              i(chunks) {
                return <Em>{chunks}</Em>;
              },
            }}
          />
        }
        subtitle={t('experience_readiness_subtitle')}
        icon={Icon}
        iconLabel="Readiness"
      />

      <SlideshowKolme
        items={SLIDESHOW_ITEMS}
        showDeviceWrapper={false}
        onSlideChange={onSlideChange}
        imageLoading="lazy"
      />
    </Section>
  );
};

export default ExperienceReadiness;
