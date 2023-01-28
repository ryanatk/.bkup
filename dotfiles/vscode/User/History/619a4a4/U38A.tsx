import { FormattedMessage, useIntl } from 'react-intl';
import { useLocaleForImage } from '../../../hooks/useLocaleForImage';
import { t } from '../../../public/locales/LocaleContext';
import Icon from '../../../svg/sleep-icon.svg';
import { dprSrcSet } from '../../../utils/imageHelpers';
import { Waypoint } from '../../sormus';
import { Em, Feature, Header, Section } from './components';

interface Props {
  onWaypointEnter: () => void;
}

const ExperienceSleep = ({ onWaypointEnter }: Props): JSX.Element => {
  const localeForImage = useLocaleForImage();
  const { formatMessage } = useIntl();

  return (
    <Section padTop id="sleep">
      <Header
        title={
          <FormattedMessage
            id="experience_sleep_title"
            values={{
              i(chunks) {
                return <Em>{chunks}</Em>;
              },
            }}
          />
        }
        subtitle={t('experience_sleep_subtitle')}
        icon={Icon}
        iconLabel={formatMessage({ id: 'experience_sleep_icon_label' })}
        iconColor="pinkHaze-medium"
      />

      <Feature
        title={t('experience_sleep_feature_1_title')}
        body={t('experience_sleep_feature_1_body')}
        imageProps={dprSrcSet(
          `homepage/${localeForImage}sleep-staging-ui@3x`,
          'png',
          270,
        )}
      />

      <Feature
        title={t('experience_sleep_feature_2_title')}
        body={t('experience_sleep_feature_2_body', {
          footnoteLink: (
            <sup>
              <a href="#legal-footnotes">1</a>
            </sup>
          ),
        })}
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
            title={t('experience_sleep_feature_3_title')}
            body={t('experience_sleep_feature_3_body')}
            imageProps={dprSrcSet(
              `homepage/${localeForImage}sleep-staging-ui@3x`,
              'png',
              270,
            )}
          />

          <Feature
            title={t('experience_sleep_feature_4_title')}
            body={t('experience_sleep_feature_4_body')}
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
