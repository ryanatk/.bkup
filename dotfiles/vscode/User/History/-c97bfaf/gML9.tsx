import { useCallback, useState } from 'react';
import AudioPlayer from '../../../sormus/AudioPlayer';

const GuidedSessions = (): JSX.Element => {
  const [playing, setPlaying] = useState(null);
  const getCommonProps = useCallback(
    (id) => ({
      isPlaying: playing === id,
      onPlay: () => setPlaying(id),
      onPause: () => setPlaying(null),
    }),
    [playing],
  );

  return (
    <ul>
      <li className="mb-2">
        <AudioPlayer
          label={'guided_sessions_audio_1_label'}
          playAriaLabel={'play_guided_sessions_audio_1_label'}
          pauseAriaLabel={'pause_guided_sessions_audio_1_label'}
          thumbnailShortSrc="homepage/explore-audio-thumb-01.png"
          thumbnailLoading="lazy"
          src="https://s3.amazonaws.com/ouraring.com/audio/insight-and-creativity-sample.mp3"
          {...getCommonProps('audio-1')}
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
          {...getCommonProps('audio-2')}
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
          {...getCommonProps('audio-3')}
        />
      </li>
    </ul>
  );
};

export default GuidedSessions;
