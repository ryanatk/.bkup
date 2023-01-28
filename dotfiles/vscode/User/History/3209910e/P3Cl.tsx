import React, { useEffect, useRef } from 'react';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { breakpoints } from '../constants';
import Grid from '../Grid';
import styles from './Banner.module.scss';

const MEDIA_TYPE_IMAGE = 'image';
const MEDIA_TYPE_VIDEO = 'video';

export interface MediaImage {
  type: typeof MEDIA_TYPE_IMAGE;
  src: string;
  /** optional src to display on larger screens */
  srcDesktop?: string;
  lazy?: boolean;
  alt?: string;
}

export interface MediaVideo {
  type: typeof MEDIA_TYPE_VIDEO;
  src: string;
  loop?: boolean;
  /** optional src to display on larger screens */
  srcDesktop?: string;
  /** optional source type e.g. video/mp4. Defaults to video/mp4 */
  srcType?: string;
  /** optional callback for when video has ended */
  onVideoEnded?: () => void;
  /** optional callback for when video is ready to play */
  onVideoReady?: () => void;
  /** optional boolean for when video is ready */
  isReady?: boolean;
}

interface BannerProps {
  media: MediaImage | MediaVideo | false;
  children: React.ReactNode;
  backgroundColor?: string;
  /** force banner to take up full viewport height */
  maxViewportHeight?: boolean;
  /** show content on left side of banner. Default is right. */
  contentLeft?: boolean;
  /** optionally pass in styled content wrapper */
  contentWrapper?: ({ children }: ContentWrapperProps) => JSX.Element;
  /** show optional mask overlay to darken media */
  withMaskOverlay?: boolean;
}

export interface ContentWrapperProps {
  children: JSX.Element;
}

const DefaultContentWrapper = ({ children }: ContentWrapperProps) => (
  <div
    className={styles.Banner__ContentCompartment}
    data-testid="content-wrapper"
  >
    {children}
  </div>
);

const Banner = ({
  children,
  media,
  backgroundColor = 'transparent',
  maxViewportHeight = false,
  contentLeft = false,
  contentWrapper: Wrapper = null,
  withMaskOverlay = false,
}: BannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const matchDesktopScreen = useMediaQuery(
    `(min-width:${breakpoints.medium}px)`,
  );

  useEffect(() => {
    if (!videoRef.current || !media || media.type !== MEDIA_TYPE_VIDEO) return;
    videoRef.current.loop = media.loop;
    if (media.onVideoReady) videoRef.current.oncanplay = media.onVideoReady;
    if (media.onVideoEnded) videoRef.current.onended = media.onVideoEnded;
  }, [videoRef, media]);

  const ContentWrapper = Wrapper ?? DefaultContentWrapper;

  return (
    <div
      className={`${styles.Banner} ${
        maxViewportHeight ? styles['Banner--MaxViewportHeight'] : ''
      } ${withMaskOverlay ? styles['Banner--WithMaskOverlay'] : ''}`}
      style={{ backgroundColor }}
    >
      {media && (
        <>
          {media.type === MEDIA_TYPE_IMAGE && (
            <img
              src={
                media.srcDesktop && matchDesktopScreen
                  ? media.srcDesktop
                  : media.src
              }
              alt={media.alt || ''}
              loading={media.lazy ? 'lazy' : 'eager'}
              className={styles.Banner__Image}
              data-image-type={matchDesktopScreen ? 'desktop' : 'default'}
            />
          )}
          {media.type === MEDIA_TYPE_VIDEO && (
            <video
              className={styles.Banner__Video}
              autoPlay
              playsInline
              muted
              ref={videoRef}
            >
              <source
                src={
                  media.srcDesktop && matchDesktopScreen
                    ? media.srcDesktop
                    : media.src
                }
                data-video-type={matchDesktopScreen ? 'desktop' : 'default'}
              />
            </video>
          )}
        </>
      )}
      <ContentWrapper>
        <Grid>
          <div
            className={`${styles.Banner__Content} ${
              contentLeft ? styles['Banner__Content--left'] : ''
            }`}
          >
            {children}
          </div>
        </Grid>
      </ContentWrapper>
    </div>
  );
};

export default Banner;
