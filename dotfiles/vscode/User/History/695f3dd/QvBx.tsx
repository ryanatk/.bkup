import { FormattedMessage } from 'react-intl';
import { Waypoint } from 'react-waypoint';
import { useLocaleForImage } from '../../../hooks/useLocaleForImage';
import { t } from '../../../public/locales/LocaleContext';
import { dprSrcSet } from '../../../utils/imageHelpers';
import { Grid } from '../../sormus';
import { Em, Feature, Section, Subtitle, Title } from './components';

interface Props {
  onWaypointEnter: () => void;
}

const ExperienceRelax = ({ onWaypointEnter }: Props): JSX.Element => {
  const localeForImage = useLocaleForImage();

  return (
    <Section>
      <Grid>
        <div className="col-start-2 col-end-6 md:col-start-3 md:col-end-13">
          <Title>
            <FormattedMessage
              id="experience_activity_title"
              values={{
                em: <Em>{t('experience_activity_title.em')}</Em>,
              }}
            />
          </Title>
        </div>

        <div className="col-start-2 col-end-6 md:col-start-8 md:col-end-13">
          <Subtitle>{t('experience_activity_subtitle')}</Subtitle>
        </div>
      </Grid>

      <Feature
        title={t('sleep_accuracy_algo_title')}
        description={t('sleep_accuracy_algo_description')}
        // TODO: update to use Image
        imageProps={dprSrcSet(
          `homepage/${localeForImage}sleep-staging-ui@3x`,
          'png',
          270,
        )}
      >
        <AudioPlayer
          label={'guided_sessions_audio_1_label'}
          playAriaLabel={'play_guided_sessions_audio_1_label'}
          pauseAriaLabel={'pause_guided_sessions_audio_1_label'}
          thumbnailShortSrc="homepage/explore-audio-thumb-01.png"
          thumbnailLoading="lazy"
          src="https://s3.amazonaws.com/ouraring.com/audio/insight-and-creativity-sample.mp3"
        />
        <AudioPlayer
          label={'guided_sessions_audio_2_label'}
          playAriaLabel={'play_guided_sessions_audio_2_label'}
          pauseAriaLabel={'pause_guided_sessions_audio_2_label'}
          thumbnailShortSrc="homepage/explore-audio-thumb-02.png"
          thumbnailLoading="lazy"
          src="https://s3.amazonaws.com/ouraring.com/audio/breath-relaxation-sample.mp3"
        />
        <AudioPlayer
          label={'guided_sessions_audio_3_label'}
          playAriaLabel={'play_guided_sessions_audio_3_label'}
          pauseAriaLabel={'pause_guided_sessions_audio_3_label'}
          thumbnailShortSrc="homepage/explore-audio-thumb-03.png"
          thumbnailLoading="lazy"
          src="https://s3.amazonaws.com/ouraring.com/audio/restful-sleep-sample.mp3"
        />
      </Feature>

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

export default ExperienceRelax;
