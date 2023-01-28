import { FormattedMessage, useIntl } from 'react-intl';
import { Waypoint } from 'react-waypoint';
import { useLocaleForImage } from '../../../hooks/useLocaleForImage';
import { t } from '../../../public/locales/LocaleContext';
import Icon from '../../../svg/activity-icon.svg';
import { dprSrcSet } from '../../../utils/imageHelpers';
import { Em, Feature, Header, Section } from './components';

interface Props {
  onWaypointEnter: () => void;
}

const ExperienceActivity = ({ onWaypointEnter }: Props): JSX.Element => {
  const localeForImage = useLocaleForImage();
  const { formatMessage } = useIntl();

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
        icon={Icon}
        iconLabel={formatMessage({ id: 'experience_activity_icon_label' })}
      />

      <Feature
        title={t('experience_activity_feature_1_title')}
        body={t('experience_activity_feature_1_body')}
        // TODO: update to use Image
        imageProps={dprSrcSet(
          `homepage/${localeForImage}sleep-staging-ui@3x`,
          'png',
          270,
        )}
      />

      <Feature
        title={t('experience_activity_feature_2_title')}
        body={t('experience_activity_feature_2_body')}
        // TODO: update to use Image
        imageProps={dprSrcSet(
          `homepage/${localeForImage}sleep-staging-ui@3x`,
          'png',
          270,
        )}
        reverse
      />

      <Waypoint window onEnter={onWaypointEnter}>
        <div>
          <Feature
            title={t('experience_activity_feature_3_title')}
            body={t('experience_activity_feature_3_body')}
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
