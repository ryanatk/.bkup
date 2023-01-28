import { useIntl } from 'react-intl';
import { useLocaleForImage } from '../../../hooks/useLocaleForImage';
import { t } from '../../../public/locales/LocaleContext';
import { dprSrcSet } from '../../../utils/imageHelpers';
import { Typography } from '../../sormus';
import AudioPlayer from '../../sormus/AudioPlayer';
import { Em, Feature, Header, Section } from './components';

const ExperienceRelax = (): JSX.Element => {
  const localeForImage = useLocaleForImage();
  const { formatMessage } = useIntl();

  return (
    <Section>
      <Header
        title={formatMessage({
          id: 'experience_relax_title',
          em: <Em>{t('experience_relax_title.em')}</Em>,
        })}
        subtitle={t('experience_relax_subtitle')}
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
      >
        <Typography color="plum" className="mt-8 mb-4">
          {t('experience_relax_sound_on')}
        </Typography>

        <ul>
          <li className="mb-2">
            <AudioPlayer
              label={'guided_sessions_audio_1_label'}
              playAriaLabel={'play_guided_sessions_audio_1_label'}
              pauseAriaLabel={'pause_guided_sessions_audio_1_label'}
              thumbnailShortSrc="homepage/explore-audio-thumb-01.png"
              thumbnailLoading="lazy"
              src="https://s3.amazonaws.com/ouraring.com/audio/insight-and-creativity-sample.mp3"
            />
          </li>
          <li className="mb-2">
            <AudioPlayer
              label={'guided_sessions_audio_2_label'}
              playAriaLabel={'play_guided_sessions_audio_2_label'}
              pauseAriaLabel={'pause_guided_sessions_audio_2_label'}
              thumbnailShortSrc="homepage/explore-audio-thumb-02.png"
              thumbnailLoading="lazy"
              src="https://s3.amazonaws.com/ouraring.com/audio/breath-relaxation-sample.mp3"
            />
          </li>
          <li className="mb-2">
            <AudioPlayer
              label={'guided_sessions_audio_3_label'}
              playAriaLabel={'play_guided_sessions_audio_3_label'}
              pauseAriaLabel={'pause_guided_sessions_audio_3_label'}
              thumbnailShortSrc="homepage/explore-audio-thumb-03.png"
              thumbnailLoading="lazy"
              src="https://s3.amazonaws.com/ouraring.com/audio/restful-sleep-sample.mp3"
            />
          </li>
        </ul>
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
    </Section>
  );
};

export default ExperienceRelax;
