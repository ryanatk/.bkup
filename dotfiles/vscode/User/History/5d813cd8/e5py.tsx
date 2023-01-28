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
    <Section padTop id="activity">
      <Header
        title={
          <FormattedMessage
            id="experience_activity_title"
            values={{
              i(chunks) {
                return <Em>{chunks}</Em>;
              },
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
        imageProps={{
          ...dprSrcSet('experience/oe-ui-activity-01@3x', 'png', 270),
          alt: formatMessage({ id: 'experience_activity_feature_1_alt' }),
        }}
      />

      <Feature
        title={t('experience_activity_feature_2_title')}
        body={t('experience_activity_feature_2_body')}
        // TODO: update to use Image
        imageProps={{
          ...dprSrcSet('experience/oe-ui-activity-02@3x', 'png', 270),
          alt: formatMessage({ id: 'experience_activity_feature_2_alt' }),
        }}
        reverse
      />

      <Waypoint onEnter={onWaypointEnter}>
        <div>
          <Feature
            title={t('experience_activity_feature_3_title')}
            body={t('experience_activity_feature_3_body')}
            imageProps={{
              ...dprSrcSet('experience/oe-ui-activity-03@3x', 'png', 270),
              alt: formatMessage({ id: 'experience_activity_feature_3_alt' }),
            }}
          />
        </div>
      </Waypoint>
    </Section>
  );
};

export default ExperienceActivity;
