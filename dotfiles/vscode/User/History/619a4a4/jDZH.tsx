import { useLocaleForImage } from '../../../hooks/useLocaleForImage';
import { t } from '../../../public/locales/LocaleContext';
import { dprSrcSet } from '../../../utils/imageHelpers';
import { Waypoint } from '../../sormus';
import { Em, Feature, Header, Section } from './components';

interface Props {
  onWaypointEnter: () => void;
}

const ExperienceSleep = ({ onWaypointEnter }: Props): JSX.Element => {
  const localeForImage = useLocaleForImage();

  return (
    <Section>
      <Header
        title={t('experience_sleep_title', {
          em: <Em>{t('experience_sleep_title.em')}</Em>,
        })}
        subtitle={t('experience_sleep_subtitle')}
      />

      <Feature
        title={t('sleep_accuracy_algo_title')}
        description={t('sleep_accuracy_algo_description')}
        imageProps={dprSrcSet(
          `homepage/${localeForImage}sleep-staging-ui@3x`,
          'png',
          270,
        )}
      />

      <Feature
        title={t('sleep_accuracy_algo_title')}
        description={t('sleep_accuracy_algo_description')}
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

          <Feature
            title={t('sleep_accuracy_algo_title')}
            description={t('sleep_accuracy_algo_description')}
            imageProps={dprSrcSet(
              `homepage/${localeForImage}sleep-staging-ui@3x`,
              'png',
              270,
            )}
            reverse
          />
        </div>
      </Waypoint>
    </Section>
  );
};

export default ExperienceSleep;
