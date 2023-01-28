import { FormattedMessage, useIntl } from 'react-intl';
import { t } from '../../../public/locales/LocaleContext';
import Icon from '../../../svg/sleep-icon.svg';
import { dprSrcSet } from '../../../utils/imageHelpers';
import { Waypoint } from '../../sormus';
import { Em, Feature, Header, Section } from './components';

interface Props {
  onWaypointEnter: () => void;
}

const ExperienceSleep = ({ onWaypointEnter }: Props): JSX.Element => {
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
        imageProps={{
          ...dprSrcSet('experience/oe-ui-sleep-01@3x', 'png', 270),
          alt: formatMessage({ id: 'experience_sleep_feature_1_alt' }),
        }}
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
        imageProps={{
          ...dprSrcSet('experience/oe-ui-sleep-02@3x', 'png', 270),
          alt: formatMessage({ id: 'experience_sleep_feature_2_alt' }),
        }}
        reverse
      />

      <Waypoint onEnter={onWaypointEnter}>
        <div>
          <Feature
            title={t('experience_sleep_feature_3_title')}
            body={t('experience_sleep_feature_3_body')}
            imageProps={{
              ...dprSrcSet('experience/oe-ui-sleep-03@3x', 'png', 270),
              alt: formatMessage({ id: 'experience_sleep_feature_3_alt' }),
            }}
          />

          <Feature
            title={t('experience_sleep_feature_4_title')}
            body={t('experience_sleep_feature_4_body')}
            imageProps={{
              ...dprSrcSet('experience/oe-ui-sleep-04@3x', 'png', 270),
              alt: formatMessage({ id: 'experience_sleep_feature_4_alt' }),
            }}
            reverse
          />
        </div>
      </Waypoint>
    </Section>
  );
};

export default ExperienceSleep;
