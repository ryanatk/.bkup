import { FormattedMessage } from 'react-intl';
import { Waypoint } from 'react-waypoint';
import { useLocaleForImage } from '../../../hooks/useLocaleForImage';
import { t } from '../../../public/locales/LocaleContext';
import { dprSrcSet } from '../../../utils/imageHelpers';
import { Em, Feature, Header, Section } from './components';

interface Props {
  onWaypointEnter: () => void;
}

const ExperienceActivity = ({ onWaypointEnter }: Props): JSX.Element => {
  const localeForImage = useLocaleForImage();

  return (
    <Section padTop>
      <Header
        title={
          <FormattedMessage
            id="experience_activity_title"
            values={{
              em: <Em>{t('experience_activity_title.em')}</Em>,
            }}
          />
        }
        subtitle={t('experience_activity_subtitle')}
      />

      <Feature
        title={t('sleep_accuracy_algo_title')}
        description={t('sleep_accuracy_algo_description')}
        // TODO: update to use Image
        imageProps={dprSrcSet(
          `homepage/${localeForImage}sleep-staging-ui@3x`,
          'png',
          270,
        )}
      />

      <Feature
        title={t('sleep_accuracy_algo_title')}
        description={t('sleep_accuracy_algo_description')}
        // TODO: update to use Image
        imageProps={dprSrcSet(
          `homepage/${localeForImage}sleep-staging-ui@3x`,
          'png',
          270,
        )}
        reverse
      />

      <Waypoint onEnter={onWaypointEnter}>
        <div>
          <Feature
            title={t('sleep_accuracy_algo_title')}
            description={t('sleep_accuracy_algo_description')}
            imageProps={dprSrcSet(
              `homepage/${localeForImage}sleep-staging-ui@3x`,
              'png',
              270,
            )}
          />
        </div>
      </Waypoint>
    </Section>
  );
};

export default ExperienceActivity;
