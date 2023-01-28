import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { EventType, sendGTMWithSegmentEvent } from '../../../analytics';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import Image from '../Image';
import Typography from '../Typography';
import styles from './AudioPlayer.module.scss';

interface AudioPlayerProps {
  src: string;
  label: MessageKey;
  playAriaLabel: MessageKey;
  pauseAriaLabel: MessageKey;
  thumbnailShortSrc?: string;
  thumbnailLoading?: 'eager' | 'lazy';
  type?: 'audio/mpeg' | 'audio/ogg';
  loop?: boolean;
  moduleName?: string;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}

const PLAY = 'play';
const PAUSE = 'pause';

const AudioPlayer = ({
  src,
  type = 'audio/mpeg',
  label,
  playAriaLabel,
  pauseAriaLabel,
  thumbnailShortSrc,
  thumbnailLoading,
  loop = false,
  moduleName = 'audio_player',
  isPlaying,
  onPlay,
  onPause,
}: AudioPlayerProps): JSX.Element => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const { asPath } = useRouter();
  const { formatMessage } = useIntl();

  const ariaLabel: string = isPlaying
    ? formatMessage({ id: pauseAriaLabel })
    : formatMessage({ id: playAriaLabel });

  const handleCanPlay = () => {
    setIsReady(true);
  };

  const handleToggleAudio = useCallback(
    (action = PAUSE) => {
      const { current } = audioRef;
      const { currentTime, duration } = current;
      const timeRemaining = duration - currentTime;
      const hasViewedContent = timeRemaining <= 0.25 * duration;
      const hasCompletedContent = timeRemaining === 0;

      const handleAnalytics = (event: EventType, duration: number) => {
        sendGTMWithSegmentEvent({
          type: event,
          payload: {
            contentTitle: formatMessage({ id: label }),
            contentType: 'audio',
            location: moduleName,
            contentDuration: duration,
            path: asPath,
          },
        });
      };

      if (action === PLAY) {
        current.play();
        return handleAnalytics(EventType.ContentPlayed, timeRemaining);
      }
      current.pause();

      if (hasCompletedContent) {
        return handleAnalytics(EventType.ContentCompleted, timeRemaining);
      }

      if (hasViewedContent) {
        return handleAnalytics(EventType.ContentViewed, timeRemaining);
      }

      return handleAnalytics(EventType.ContentPaused, timeRemaining);
    },
    [asPath, formatMessage, label, moduleName],
  );

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) handleToggleAudio(PLAY);
    else handleToggleAudio(PAUSE);
  }, [isPlaying, handleToggleAudio]);

  /**
   * Needed for iOS, since neither `onCanPlay` or `onCanPlayCapture` appear to fire
   */
  useEffect(() => {
    const audio = audioRef.current;

    audio?.addEventListener('loadedmetadata', handleCanPlay);

    return () => audio?.removeEventListener('loadedmetadata', handleCanPlay);
  }, []);

  const toggleAudio = () => (isPlaying ? onPause() : onPlay());

  return (
    <div className={styles.AudioPlayer}>
      <audio
        ref={audioRef}
        controls={false}
        loop={loop}
        onEnded={toggleAudio}
        muted={isPlaying ? false : true}
        autoPlay={false}
        onCanPlay={handleCanPlay}
      >
        <source src={src} type={type} />
      </audio>

      <div className={styles.AudioPlayer__Compartment}>
        {thumbnailShortSrc && (
          <div>
            <Image
              shortSrc={thumbnailShortSrc}
              loading={thumbnailLoading}
              width={48}
              height={48}
              alt=""
            />
          </div>
        )}

        <Typography
          variant="eyebrow"
          weight="normal"
          color="inherit"
          className={styles.AudioPlayer__Label}
        >
          {t(label)}
        </Typography>

        <div className={styles.AudioPlayer__Controls}>
          <button
            onClick={() => toggleAudio()}
            className={styles.AudioPlayer__Button}
            disabled={!isReady}
            aria-label={ariaLabel}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
