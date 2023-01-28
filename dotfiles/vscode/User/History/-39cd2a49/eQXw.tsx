import { FormattedMessage, useIntl } from 'react-intl';
import useSlideshowItems from '../../../hooks/useSlideshowItems';
import { t } from '../../../public/locales/LocaleContext';
import Icon from '../../../svg/readiness-icon.svg';
import SlideshowKolme from '../../sormus/SlideshowKolme';
import { Em, Header, Section } from './components';
import { READINESS_SLIDESHOW_ITEMS } from './data';
import { useSlideChange } from './hooks';

const ExperienceReadiness = (): JSX.Element => {
  const { formatMessage } = useIntl();
  const onSlideChange = useSlideChange('experience-readiness');
  const slideshowItems = useSlideshowItems(READINESS_SLIDESHOW_ITEMS, 'medium');

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
        iconLabel={formatMessage({ id: 'experience_readiness_icon_label' })}
      />

      <SlideshowKolme
        items={slideshowItems}
        showDeviceWrapper={false}
        onSlideChange={onSlideChange}
        imageLoading="lazy"
      />
    </Section>
  );
};

export default ExperienceReadiness;
