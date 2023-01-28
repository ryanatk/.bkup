import { MouseEventHandler, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { a, config, useSpring } from 'react-spring';
import { Waypoint } from 'react-waypoint';
import tw, { screen, styled } from 'twin.macro';
import { EventType, PayloadItems, sendSegmentTrack } from '../../../analytics';
import { useA11yContext } from '../../../contexts/A11yContext';
import { useHeaderContext } from '../../../contexts/HeaderContext';
import useMediaQuery from '../../../hooks/useMediaQuery';
import usePDPUrl from '../../../hooks/usePDPUrl';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import PlayIcon from '../../../svg/home-hero-play-icon.svg';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';
import { src } from '../../../utils/imageHelpers';
import { Button, Grid, Image, Typography, Video } from '../../sormus';
import { ButtonVariant } from '../../sormus/Button';
import { breakpoints } from '../../sormus/constants';
import Modal from '../../sormus/Modal';
import ScrollTeaser, {
  ScrollTeaserProps,
} from '../../sormus/ScrollTeaser/ScrollTeaserNew';

interface HeroProps {
  headerHeight: number;
}

const Section = styled.section(({ headerHeight }: { headerHeight: number }) => [
  `
    height: 100vh;
    height: 100svh;
    margin-top: -${headerHeight}px;
  `,
  screen`lg`({ height: '95vh' }),
  tw`
    left-0
    sticky
    text-center
    top-0
    text-white
    w-full
    z-0
    lg:text-left
    motion-reduce:relative
  `,
]);

const SectionInner = tw(a.div)`
  h-full
  w-full
`;

const BackgroundWrapper = styled(a.div)(() => [
  tw`
    absolute
    h-full
    left-0
    pointer-events-none
    top-0
    w-full
  `,
  `
    img, video {
      display: block;
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  `,
]);

const Content = tw.div`
  col-main
  flex
  flex-col
  h-full
  items-center
  pb-14
  pt-36
  relative
  w-full
  z-10
  md:(pb-24 pt-48)
  lg:(
    col-start-3
    col-end-9
    flex-row
    flex-wrap
    h-auto
    items-center
  )
  xl:col-end-8
`;

const Title = styled(Typography)(({ isSantaComplete }) => [
  tw`
    font-extralight
    leading-tight
    lg:(flex-shrink-0 w-full)
  `,
  isSantaComplete
    ? tw`
      order-2
      text-6xl
      mb-2
      lg:(order-1)
    `
    : tw`
      text-4xl
      mb-6
      md:(text-7xl tracking-[-2px])
      xl:(text-[5.25rem])
    `,
]);

const Body = styled(Typography)(({ isSantaComplete }) => [
  tw`
    lg:(flex-shrink-0 w-full)
  `,
  isSantaComplete
    ? tw`
      order-1
      text-lg
      mb-2
      lg:order-2
      lg:text-xl
    `
    : tw`
      text-xl
      md:text-[1.6rem]
    `,
  tw`
    leading-relaxed
  `,
]);

const VideoCTA = tw.button`
  bg-transparent
  flex-col
  inline-flex
  items-center
  mt-6
  rounded-full
  text-inherit
  lg:(flex-row m-0)
`;

const VideoCTALabel = tw.span`
  block
  font-bold
  leading-4
  mt-3
  text-sm
  whitespace-nowrap
  lg:(mt-0 ml-2)
`;

const PassThroughWrapper = ({ children }: ScrollTeaserProps): JSX.Element => (
  <>{children}</>
);

const Background = ({
  videoEnabled = false,
  matchLargeScreen,
}: {
  videoEnabled: boolean;
  matchLargeScreen: boolean;
}): JSX.Element => {
  const { formatMessage } = useIntl();
  const { prefersReducedMotion } = useA11yContext();
  const isSantaComplete = checkFeatureFlag('santa-complete');

  const imageData = useMemo((): {
    src: string;
    alt: MessageKey;
    className?: string;
  } => {
    const srcPrefix = matchLargeScreen ? 'd' : 'm';

    if (isSantaComplete) {
      return {
        src: `simple-home/${srcPrefix}-hero-img-ny@2x`,
        alt: 'home_hero_santa_complete_img_alt',
      };
    }

    return {
      src: `simple-home/${srcPrefix}-home-hero-img-december@2x`,
      alt: 'home_hero_december_img_alt',
    };
  }, [matchLargeScreen, isSantaComplete]);

  if (prefersReducedMotion || !videoEnabled) {
    return (
      <Image
        className={imageData.className}
        src={src(imageData.src, 'jpg', matchLargeScreen ? 1920 : 1024, 't')}
        alt={formatMessage({ id: imageData.alt })}
        loading="eager"
        data-cy="hero-background-image"
        data-image-type={matchLargeScreen ? 'desktop' : 'default'}
      />
    );
  } else {
    return (
      <video
        muted
        autoPlay
        loop
        controls={false}
        data-cy="hero-background-video"
      >
        <source
          src={
            matchLargeScreen
              ? 'https://s3.amazonaws.com/ouraring.com/video/homepage/d-homepage-hero-video.mp4'
              : 'https://s3.amazonaws.com/ouraring.com/video/homepage/m-homepage-hero-video.mp4'
          }
          type="video/mp4"
          data-video-type={matchLargeScreen ? 'desktop' : 'default'}
        />
      </video>
    );
  }
};

const HeroButton = ({
  visible = false,
  variant = 'secondary',
}: {
  visible: boolean;
  variant: ButtonVariant;
}): JSX.Element => {
  const pdpUrl = usePDPUrl();

  const handleAnalytics = (type: EventType, payload: PayloadItems) => {
    sendSegmentTrack({
      type,
      payload,
    });
  };

  const ctaSpring = useSpring({
    opacity: visible ? 1 : 0,
    config: { tension: 100 },
  });

  return (
    <a.div className="mt-4 lg:mr-6 order-3" style={ctaSpring}>
      <Button
        variant={variant}
        shade="dark"
        size="large"
        data-cy="hero-cta"
        href={pdpUrl}
        link
        onClick={() =>
          handleAnalytics(EventType.CTAClicked, {
            cta: 'shop_now',
            action: 'go_to_pdp',
            location: 'hero',
          })
        }
      >
        {t('simple_home_hero_cta_label')}
      </Button>
    </a.div>
  );
};

const HeroVideo = ({
  visible = false,
  videoEnabled = false,
  handleVideoCtaClick,
}: {
  visible: boolean;
  videoEnabled: boolean;
  handleVideoCtaClick: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element => {
  const videoCtaIconSpring = useSpring({
    transform: `scale3d(${visible ? '1, 1' : '0, 0'}, 1)`,
    config: { tension: 100 },
  });
  const videoCtaLabelSpring = useSpring({
    opacity: visible ? 1 : 0,
    config: { ...config.gentle },
  });
  if (!videoEnabled) return null;
  return (
    <VideoCTA data-cy="hero-video-cta" onClick={handleVideoCtaClick}>
      <a.div style={videoCtaIconSpring}>
        <PlayIcon />
      </a.div>
      <a.div style={videoCtaLabelSpring} className="overflow-hidden">
        <VideoCTALabel>{t('simple_home_hero_video_cta_label')}</VideoCTALabel>
      </a.div>
    </VideoCTA>
  );
};

const TitleText = ({
  visible,
  messageKey,
  lineBreak = false,
}: {
  visible: boolean;
  messageKey: MessageKey;
  lineBreak?: boolean;
}): JSX.Element => {
  const titleSpring = useSpring({
    opacity: visible ? 1 : 0,
    transform: `translate3d(0, ${visible ? '0' : '-80px'}, 0)`,
    config: { ...config.molasses },
  });
  return (
    <a.span className="inline-block" style={titleSpring}>
      <FormattedMessage
        id={messageKey}
        values={{
          i(chunks) {
            return (
              <>
                {lineBreak && <br />}
                <em className="font-serif">{chunks}</em>
              </>
            );
          },
          br: <br />,
        }}
      />
    </a.span>
  );
};

const ContentSection = ({
  visible = false,
  videoEnabled = false,
  handleVideoCtaClick,
}: {
  visible: boolean;
  videoEnabled: boolean;
  handleVideoCtaClick: () => void;
}) => {
  const eyebrowSpring = useSpring({
    opacity: visible ? 1 : 0,
    transform: `translate3d(0, ${visible ? '0' : '-40px'}, 0)`,
    config: { ...config.molasses },
  });
  const isSantaComplete = checkFeatureFlag('santa-complete');

  return (
    <Content>
      <Title
        Element="h2"
        color="inherit"
        weight="light"
        data-cy="hero-title"
        isSantaComplete={isSantaComplete}
      >
        <TitleText
          visible={visible}
          messageKey={
            isSantaComplete
              ? 'home_hero_santa_complete_title'
              : 'home_hero_december_title'
          }
        />
      </Title>

      <Body color="white" data-cy="hero-body" isSantaComplete={isSantaComplete}>
        <a.span className="inline-block" style={eyebrowSpring}>
          {isSantaComplete ? (
            <FormattedMessage
              id="home_hero_santa_complete_eyebrow"
              values={{
                br: <br />,
              }}
            />
          ) : (
            t('home_hero_december_eyebrow')
          )}
        </a.span>
      </Body>
      <HeroButton variant="secondary" visible={visible} />
      <HeroVideo
        visible={visible}
        videoEnabled={videoEnabled}
        handleVideoCtaClick={handleVideoCtaClick}
      />
    </Content>
  );
};

const Hero = ({ headerHeight }: HeroProps): JSX.Element => {
  const { setInverse } = useHeaderContext();
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoEnabled = checkFeatureFlag('enable-horizon-home-video');
  const showScrollTeaser = checkFeatureFlag('show-scroll-teaser');
  const matchLargeScreen = useMediaQuery(`(min-width: ${breakpoints.large}px)`);

  const Wrapper = showScrollTeaser ? ScrollTeaser : PassThroughWrapper;

  const heroSpring = useSpring({
    opacity: visible ? 1 : 0,
    config: { duration: 1000 },
  });

  const bgSpring = useSpring({
    transform: `translate3d(0, ${visible ? '0' : '-100px'}, 0)`,
    config: { tension: 120, friction: 60 },
  });

  const handleAnalytics = (type: EventType, payload: PayloadItems) => {
    sendSegmentTrack({
      type,
      payload,
    });
  };

  const handleVideoCtaClick = () => {
    if (!videoLoaded) setVideoLoaded(true);
    setModalOpen(true);
    handleAnalytics(EventType.ContentPlayed, {
      cta: 'watch_the_film',
      action: 'play_video',
      location: 'hero',
    });
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Wrapper text={t('meet_oura_ring_scroll_to_discover')} darkMode={false}>
      <Waypoint
        onEnter={() => {
          if (!visible) setVisible(true);
          setInverse(true);
        }}
        onLeave={() => {
          setInverse(false);
        }}
      >
        {/** Since the hero itself is position sticky, we need this fake
         * element to trigger the waypoint events properly
         */}
        <div
          css={[
            `
              height: 100vh;
              height: 100svh;
              z-index: -1;
            `,
            tw`
              absolute
              top-0
              left-0
              w-full
              pointer-events-none
            `,
          ]}
          aria-hidden="true"
        />
      </Waypoint>
      <Section headerHeight={headerHeight}>
        <SectionInner style={heroSpring}>
          <BackgroundWrapper style={bgSpring}>
            <Background
              videoEnabled={videoEnabled}
              matchLargeScreen={matchLargeScreen}
            />
          </BackgroundWrapper>
          <Grid className="h-full lg:items-center">
            <ContentSection
              visible={visible}
              handleVideoCtaClick={handleVideoCtaClick}
              videoEnabled={videoEnabled}
            />
          </Grid>
        </SectionInner>
      </Section>
      {videoEnabled && (
        <Modal open={modalOpen} onClose={handleModalClose} maxWidth="lg">
          {videoLoaded && (
            <Video
              src="https://s3.amazonaws.com/ouraring.com/video/homepage/OURA_THE_F_WORD_30_06.mp4"
              type="video/mp4"
              location="horizon_video"
              contentTitle="horizon_video"
              playVideo={modalOpen}
              className="w-full"
            />
          )}
        </Modal>
      )}
    </Wrapper>
  );
};

export default Hero;
