import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { a, config, useSpring } from 'react-spring';
import { Waypoint } from 'react-waypoint';
import tw, { screen, styled } from 'twin.macro';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { src } from '../../../utils/imageHelpers';
import { Grid, Image, Typography } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import useMissionImagesScrollAnimation from './hooks/useMissionImagesScrollAnimation';

const Section = tw.section`
bg-sand
  -mt-7
  overflow-x-hidden
  pt-14
  pb-20
  relative
  rounded-t-xl
  text-helsinkiBlue-dark
  md:(pt-20 rounded-t-[1.75rem])
  lg:(pt-40 pb-24)
  xl:(pt-48 pb-52)
`;

const ContentWrapper = tw(Grid)`
  relative
  z-10
`;

const TitleWrapper = tw.div`
  col-main
  md:col-start-5
`;

const Title = styled(Typography)(() => [
  {
    paddingLeft: '0.9em',
    textIndent: '-0.9em',
  },
  screen`lg`({
    paddingLeft: '1.25em',
    textIndent: '-1.25em',
  }),
  tw`
    text-6xl
    tracking-[-2px]
    relative
    z-10
    md:(text-7xl)
    lg:text-8xl
    xl:text-9xl
  `,
]);

const BodyWrapper = tw.div`
  col-main
  md:(col-start-4 col-end-12)
  lg:(col-start-7 col-end-11)
`;

const Body = tw(Typography)`
  md:text-lg
  xl:(
    transform
    translate-x-10
    text-xl
  )
`;

const ImagesWrapper = tw(Grid)`
  transform
  translate-x-[22.5%]
  lg:(
    absolute
    h-full
    left-0
    top-0
    translate-x-0
    w-full
  )
`;

const FloatingImages = tw(a.div)`
  col-full
  flex
  gap-3
  justify-center
  mt-28
  motion-safe:justify-start
  lg:(col-main mt-0 relative)
`;

const FloatingImage = tw(Image)`
  relative
  w-52
  md:w-auto
  lg:(absolute w-[27vw])
  xl:w-auto
`;

const FloatingImage1 = styled(FloatingImage)(() => [
  screen`lg`({
    top: 55,
    right: 0,
  }),
  screen`xl`({
    top: 75,
  }),
]);

const FloatingImage2 = styled(FloatingImage)(() => [
  tw`
    -top-11
  `,
  screen`lg`({
    top: 320,
    left: 50,
  }),
  screen`xl`({
    top: 375,
    left: 0,
  }),
]);

const FloatingImage3 = styled(FloatingImage)(() => [
  screen`lg`({
    bottom: 96,
    right: -225,
  }),
  screen`xl`({
    right: -350,
  }),
]);

const Mission = (): JSX.Element => {
  const { formatMessage } = useIntl();
  const matchLargeScreen = useMediaQuery(`(min-width: ${breakpoints.large}px)`);
  const [titleVisible, setTitleVisible] = useState(false);
  const [bodyVisible, setBodyVisible] = useState(false);
  const [imagesVisible, setImagesVisible] = useState(false);
  const titleSpring = useSpring({
    opacity: titleVisible ? 1 : 0,
    transform: `translate3d(0, ${titleVisible ? '0' : '100px'}, 0)`,
    config: { ...config.molasses },
  });
  const bodySpring = useSpring({
    opacity: bodyVisible ? 1 : 0,
    transform: `translate3d(0, ${bodyVisible ? '0' : '70px'}, 0)`,
    config: { ...config.molasses },
  });
  const imagesScrollAnimation = useMissionImagesScrollAnimation(imagesVisible);
  return (
    <Section>
      <ContentWrapper>
        <TitleWrapper>
          <a.div style={titleSpring}>
            <Waypoint
              scrollableAncestor="window"
              bottomOffset="15%"
              onEnter={() => {
                if (!titleVisible) setTitleVisible(true);
              }}
            />
            <Title Element="h2" weight="light" color="inherit">
              <FormattedMessage
                id="simple_home_mission_title_line_1"
                values={{
                  i(chunks) {
                    return <em className="font-serif">{chunks}</em>;
                  },
                }}
              />
              <br />
              <FormattedMessage
                id="simple_home_mission_title_line_2"
                values={{
                  i(chunks) {
                    return <em className="font-serif">{chunks}</em>;
                  },
                }}
              />
            </Title>
          </a.div>
        </TitleWrapper>
        <BodyWrapper>
          <Waypoint
            scrollableAncestor="window"
            bottomOffset="15%"
            onEnter={() => {
              if (!bodyVisible) setBodyVisible(true);
            }}
          />
          <a.div style={bodySpring}>
            <Body color="inherit">{t('simple_home_mission_body')}</Body>
          </a.div>
        </BodyWrapper>
      </ContentWrapper>
      <ImagesWrapper>
        <FloatingImages
          ref={imagesScrollAnimation.ref}
          style={imagesScrollAnimation.styles}
        >
          <Waypoint
            scrollableAncestor="window"
            bottomOffset={matchLargeScreen ? '33%' : '15%'}
            onEnter={() => {
              if (!imagesVisible) setImagesVisible(true);
            }}
          />
          <FloatingImage1
            src={
              matchLargeScreen
                ? src('simple-home/d-home-overview-img-01@2x', 'jpg', 405)
                : src(`simple-home/m-home-overview-img-01@2x`, 'jpg', 300)
            }
            alt={formatMessage({ id: 'simple_home_mission_image_1_alt' })}
          />
          <FloatingImage2
            src={
              matchLargeScreen
                ? src('simple-home/d-home-overview-img-02@2x', 'jpg', 480)
                : src(`simple-home/m-home-overview-img-02@2x`, 'jpg', 300)
            }
            alt={formatMessage({ id: 'simple_home_mission_image_2_alt' })}
          />
          <FloatingImage3
            src={
              matchLargeScreen
                ? src('simple-home/d-home-overview-img-03@2x', 'jpg', 480)
                : src(`simple-home/m-home-overview-img-03@2x`, 'jpg', 300)
            }
            alt={formatMessage({ id: 'simple_home_mission_image_3_alt' })}
          />
        </FloatingImages>
      </ImagesWrapper>
    </Section>
  );
};

export default Mission;
