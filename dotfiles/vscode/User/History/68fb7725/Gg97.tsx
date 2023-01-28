import cx from 'classnames';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { a, config, useSpring } from 'react-spring';
import { Waypoint } from 'react-waypoint';
import tw, { styled } from 'twin.macro';
import { EventType, sendSegmentTrack } from '../../../analytics';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { src } from '../../../utils/imageHelpers';
import { Button, Grid, Image, Stat, Typography } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import { SubsectionProps } from './AppFeature';
import AppFeatureUIOverlay from './AppFeatureUIOverlay';
import {
  AppFeatureSubsectionData,
  DirectionUnion,
} from './data/appFeatureSubsectionData';

const Wrapper = tw.div`
  pb-20
  lg:(
    flex
    items-center
    min-h-screen
    py-24
  )
`;

const ContentWrapper = styled(a.div)(
  ({ direction }: { direction: DirectionUnion }) => [
    tw`
      col-main
      mt-10
      md:(col-start-4 col-end-12)
      lg:mt-0
    `,
    direction === 'left-to-right'
      ? tw`
        lg:(
          col-start-3
          col-end-6
          order-1
        )
      `
      : tw`
        lg:(
          col-start-10
          col-end-13
          order-2
        )
        xl:col-start-10
      `,
  ],
);

const LabelWrapper = tw.div`
  flex
  items-center
  mb-6
  transition-colors
  duration-700
`;

const Label = tw(Typography)`
  inline-block
  ml-4
  text-sm
  transition-colors
  duration-700
`;

const Title = tw(Typography)`
  font-light
  mb-3
  text-3xl
`;

const Body = tw(Typography)`
  mb-6
  text-base
`;

const ImageWrapper = styled(a.div)(
  ({ direction }: { direction: DirectionUnion }) => [
    tw`
      col-full
      -mb-24
      lg:mb-0
    `,
    direction === 'left-to-right'
      ? tw`
        lg:(
          col-start-9
          col-end-full
          order-2
        )
      `
      : tw`
        lg:(
          col-start-full
          col-end-7
          flex
          items-start
          justify-end
          order-1
        )
      `,
  ],
);

const StatsWrapper = tw.div`
  flex
  flex-wrap
  gap-10
  mt-10
`;

const AppFeatureSubsection = ({
  direction,
  icon,
  label,
  image,
  screen,
  title,
  body,
  cta,
  stats,
  ctaVariant = 'tertiary',
  ctaColor = 'helsinkiBlue-dark',
  labelColor = 'helsinkiBlue-dark',
  active = false,
}: SubsectionProps & AppFeatureSubsectionData): JSX.Element => {
  const matchMediumScreen = useMediaQuery(
    `(min-width: ${breakpoints.medium}px)`,
  );
  const matchLargeScreen = useMediaQuery(`(min-width: ${breakpoints.large}px)`);
  const { formatMessage } = useIntl();
  const labelText = formatMessage({ id: label.text });
  const imageSrc = matchMediumScreen
    ? src(image.desktopSrc, 'jpg', 1024)
    : src(image.mobileSrc, 'jpg', 1024);
  const imageAlt = formatMessage({ id: image.alt });
  const [imageVisible, setImageVisible] = useState(false);
  const [uiOverlayVisible, setUiOverlayVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const imageSpring = useSpring({
    opacity: imageVisible ? 1 : 0,
    transform: `translate3d(0, ${!imageVisible ? '10%' : '0'}, 0)`,
    config: { ...config.molasses },
  });
  const uiOverlaySpring = useSpring({
    opacity: uiOverlayVisible ? 1 : 0,
    transform: `translate3d(0, ${
      !uiOverlayVisible && !matchLargeScreen ? '10%' : '0'
    }, 0)`,
    config: { ...config.molasses },
  });
  const contentSpring = useSpring({
    opacity: contentVisible ? 1 : 0,
    transform: `translate3d(0, ${contentVisible ? '0' : '10%'}, 0)`,
    config: { ...config.molasses },
  });

  useEffect(() => {
    if (matchLargeScreen && active) {
      if (!uiOverlayVisible) setUiOverlayVisible(true);
      if (!imageVisible) setImageVisible(true);
      if (!contentVisible) setContentVisible(true);
    }
  }, [
    matchLargeScreen,
    active,
    imageVisible,
    contentVisible,
    uiOverlayVisible,
  ]);

  const handleAnalytics = () => {
    sendSegmentTrack({
      type: EventType.CTAClicked,
      payload: {
        cta: formatMessage({ id: cta.label }),
        action: `go_to_${cta.url}_page`,
        location: 'body',
        module: formatMessage({ id: title }),
      },
    });
  };

  return (
    <Wrapper>
      <Grid className="w-full flex-shrink-0 lg:hidden">
        <ImageWrapper>
          <Image src={imageSrc} alt={imageAlt} loading="lazy" />
        </ImageWrapper>
      </Grid>
      <AppFeatureUIOverlay
        onEnter={() => {
          if (!uiOverlayVisible) setUiOverlayVisible(true);
        }}
        style={uiOverlaySpring}
        active={active}
        image={screen}
      />
      <Grid className="w-full flex-shrink-0 lg:items-center">
        <ImageWrapper
          style={imageSpring}
          className="hidden lg:flex"
          direction={direction}
        >
          {!matchLargeScreen && (
            <Waypoint
              bottomOffset="33%"
              onEnter={() => {
                if (!imageVisible) setImageVisible(true);
              }}
            />
          )}
          <div className="lg:max-w-screen-md">
            <Image src={imageSrc} alt={imageAlt} loading="lazy" />
          </div>
        </ImageWrapper>
        <ContentWrapper style={contentSpring} direction={direction}>
          {!matchLargeScreen && (
            <Waypoint
              bottomOffset="33%"
              onEnter={() => {
                if (!contentVisible) setContentVisible(true);
              }}
            />
          )}
          <LabelWrapper className={cx(`text-${labelColor}`)}>
            {icon}
            <Label color={labelColor}>{labelText}</Label>
          </LabelWrapper>
          <Title color="inherit" Element="h3">
            {t(title)}
          </Title>
          <Body color="inherit">{t(body)}</Body>
          <Button
            data-cy={`app-feature-${labelText.toLowerCase()}-cta`}
            variant={ctaVariant}
            color={ctaColor}
            size="medium"
            href={cta.url}
            link
            onClick={handleAnalytics}
          >
            {t(cta.label)}
          </Button>
          {!!stats?.length && (
            <StatsWrapper>
              {stats.map((stat, i) => (
                <Stat
                  className="w-1/2 flex-shrink-0"
                  key={`${labelText.toLowerCase()}-stat-${i}`}
                  {...stat}
                />
              ))}
            </StatsWrapper>
          )}
        </ContentWrapper>
      </Grid>
    </Wrapper>
  );
};

export default AppFeatureSubsection;
