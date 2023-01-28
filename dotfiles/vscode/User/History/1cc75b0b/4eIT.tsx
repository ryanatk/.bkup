import React from 'react';
import tw, { screen, styled } from 'twin.macro';
import { t } from '../../../public/locales/LocaleContext';
import {
  DeviceWrapper,
  Grid,
  Slideshow,
  SlideshowCurrentContent,
  SlideshowCurrentMedia,
  SlideshowNavigation,
  Typography,
  TypographyRhythm,
} from '../../sormus';
import { featureHighlightsData } from './data/featureHighlights';

const Section = tw.section`
  bg-white
  pt-12
  pb-14
  lg:py-20
`;

const ContentBox = tw.div`
  col-main
  md:col-start-3
  md:col-end-13
  lg:col-end-6
`;

const SectionTitle = tw(Typography)`
  font-normal
  text-center
  lg:text-left
  lg:mt-32
`;

const SlideshowMedia = styled.div(() => [
  screen`sm`({ height: 575 }),
  tw`
    text-center
    col-main
    md:col-start-3
    md:col-end-8
    lg:col-start-6
    md:h-auto
  `,
]);

const SlideshowMediaCompartment = tw.div`
  inline-block
  mx-auto
`;

const SlideshowContent = tw.div`
  relative
  col-main
  md:col-start-9
  md:col-end-13
  md:flex
  lg:ml-16
  lg:col-start-9
`;

const SlideshowContentCompartment = styled.div(() => [
  screen`sm`({ height: 320 }),
  tw`
    absolute
    z-10
    bottom-0
    right-0
    left-0
    bg-white
    flex
    flex-col-reverse
    justify-between
    border-t-2
    border-grayscale
    md:border-none
    md:bg-transparent
    md:static
    md:content-end
    md:h-auto
    lg:h-full
  `,
]);

const buildSlideshowItems = () => {
  return featureHighlightsData.map(({ title, description, image }) => ({
    shortSrc: `${image}.png`,
    width: 300,
    alt: '',
    content: function SlideShowItem() {
      return (
        <TypographyRhythm>
          <Typography
            Element="h3"
            variant="h6"
            className="mb-3"
            color="blackRussian"
            weight="normal"
          >
            {t(title)}
          </Typography>
          <Typography color="blackRussian">{t(description)}</Typography>
        </TypographyRhythm>
      );
    },
  }));
};

export const Features = () => {
  return (
    <Section>
      <Slideshow items={buildSlideshowItems()} interval={0} imageLoading="lazy">
        <Grid className="gap-y-8 lg:gap-y-0">
          <ContentBox>
            <SectionTitle Element="h3" variant="h2" color="stravaOrange">
              {t('strava_features_title')}
            </SectionTitle>
          </ContentBox>
          <SlideshowMedia>
            <SlideshowMediaCompartment>
              <DeviceWrapper>
                <SlideshowCurrentMedia />
              </DeviceWrapper>
            </SlideshowMediaCompartment>
          </SlideshowMedia>
          <SlideshowContent>
            <SlideshowContentCompartment>
              <div className="lg:max-w-xs">
                <SlideshowNavigation />
              </div>
              <div className="lg:mt-24">
                <SlideshowCurrentContent />
              </div>
            </SlideshowContentCompartment>
          </SlideshowContent>
        </Grid>
      </Slideshow>
    </Section>
  );
};

export default Features;
