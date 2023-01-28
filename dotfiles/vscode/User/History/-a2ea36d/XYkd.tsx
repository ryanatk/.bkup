import { useRouter } from 'next/router';
import { useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { EventType, sendGTMWithSegmentEvent } from '../../analytics';
import { TestimonialSection } from '../../components/pages/meet-the-community';
import {
  BetterSleepBanner,
  ProductAccolades,
} from '../../components/pages/_global';
import {
  Box,
  Footer,
  Grid,
  Header,
  MainContent,
  PageContainer,
  ScrollTeaser,
  SlideshowYksi,
  Spacer,
  Typography,
} from '../../components/sormus';
import { breakpoints } from '../../components/sormus/constants';
import {
  CASE_STUDIES_DATA,
  STORIES_DATA,
  TESTIMONIALS_DATA,
} from '../../data/meet-the-community';
import useMediaQuery from '../../hooks/useMediaQuery';
import { srcSet } from '../../utils/imageHelpers';
import pageStyles from './index.module.scss';

const STORIES_THAT_INSPIRE_TITLE = 'Stories that inspire us.';

const handleAnalytics = (index: number, asPath: string) => {
  sendGTMWithSegmentEvent({
    type: EventType.CarouselArrowsClicked,
    payload: {
      carouselTitle: STORIES_THAT_INSPIRE_TITLE,
      carouselNumberInOrder: index,
      path: asPath,
    },
  });
};

const pageSectionStyle = (key: string) => {
  switch (key) {
    case 'sky-blue':
      return pageStyles.SectionSkyBlue;
    case 'deep-blue':
      return pageStyles.SectionDeepBlue;
    case 'skin-tone':
      return pageStyles.Sectionsand;
    default:
      return pageStyles.SectionDefault;
  }
};

const MeetTheCommunity = () => {
  const { asPath } = useRouter();
  const isMinWidthMedium = useMediaQuery(`(min-width:${breakpoints.medium}px)`);
  const [activeBgColor, setActiveBgColor] = useState('default');

  return (
    <div className="tailwind">
      <div
        className={`${pageStyles.SectionDefault} ${pageSectionStyle(
          activeBgColor,
        )}`}
      >
        <Header bordered />

        <MainContent>
          <PageContainer name="meet-the-community" padding="top">
            <Box className="mb-4 md:sr-only">
              <Typography Element="h1" variant="h6">
                Meet the Community
              </Typography>
            </Box>
            <Waypoint
              scrollableAncestor={window}
              bottomOffset="20%"
              topOffset="60%"
              onEnter={() => setActiveBgColor('default')}
            >
              <div className="lg:pb-24">
                <Grid>
                  <Typography
                    Element="h2"
                    variant="h1"
                    className="col-start-2 col-main md:col-start-4"
                  >
                    Built for everybody.
                  </Typography>
                  <Typography
                    variant="h5"
                    className="col-start-2 col-main md:col-start-8 md:col-end-13"
                  >
                    We are all part of the same circle &mdash; from pro-athletes
                    optimizing performance to those striving to improve their
                    personal wellbeing.
                  </Typography>
                  <div className="col-start-2 md:col-start-4 col-full pt-2 md:pt-16">
                    <img
                      {...srcSet(
                        isMinWidthMedium
                          ? 'meet-the-community/d-life-with-oura_hero-image@2x'
                          : 'meet-the-community/m-life-with-oura_hero-image@2x',
                      )}
                      alt=""
                      className="object-cover w-full"
                      loading="eager"
                    />
                  </div>
                </Grid>
              </div>
            </Waypoint>
            {/* End: Built for everyone */}

            <div className="py-10 md:py-24">
              <Grid>
                <Typography
                  Element="h2"
                  variant="h2"
                  className="col-start-2 col-main md:col-start-4 md:col-end-10 lg:col-start-3 lg:col-end-8"
                >
                  Trusted by pros, worn by you.
                </Typography>
              </Grid>
            </div>
            {/* End: Teaser */}

            <Waypoint
              onLeave={() => {
                setActiveBgColor('default');
              }}
              scrollableAncestor={window}
              bottomOffset="20%"
              topOffset="60%"
            >
              <div>
                {TESTIMONIALS_DATA.map((testimonial, index) => (
                  <Waypoint
                    key={index}
                    onEnter={() => {
                      setActiveBgColor(
                        index % 2
                          ? 'sky-blue'
                          : index % 3
                          ? 'deep-blue'
                          : 'skin-tone',
                      );
                    }}
                    scrollableAncestor={window}
                    bottomOffset="20%"
                    topOffset="60%"
                  >
                    <div className="py-10 md:py-24">
                      <TestimonialSection
                        testimonial={testimonial}
                        reverseLayout={index % 2 ? true : false}
                      />
                    </div>
                  </Waypoint>
                ))}
              </div>
            </Waypoint>
            {/* End: testimonials */}

            <div className="py-10 md:py-24">
              <Grid>
                <Typography
                  Element="h2"
                  variant="h2"
                  className="col-start-3 col-main md:col-start-6 md:col-end-10 lg:col-start-8 lg:col-end-12 lg:mb-12"
                  color="inherit"
                >
                  {STORIES_THAT_INSPIRE_TITLE}
                </Typography>
              </Grid>
              <div className="lg:mt-10">
                <SlideshowYksi
                  items={STORIES_DATA}
                  onNavNext={(currentIndex) =>
                    handleAnalytics(currentIndex, asPath)
                  }
                  onNavPrev={(currentIndex) =>
                    handleAnalytics(currentIndex, asPath)
                  }
                />
              </div>
            </div>
            {/* End: Stories That Inspire Us */}

            <div className="py-10 md:py-24">
              <Grid rowCount={1}>
                <div className="col-start-2 col-main lg:col-start-3 lg:col-span-5">
                  <Typography variant="h2" Element="h2" className="lg:max-w-lg">
                    Our results speak for themselves.
                  </Typography>
                </div>
                <div className="col-start-2 col-main lg:col-start-8 lg:col-span-5">
                  <Typography variant="h5">
                    Oura has been validated by independent studies at UCSF, UC
                    San Diego, Massachusetts Institute of Technology (MIT)
                    Lincoln Laboratory, the US Army, the US Navy &mdash; and
                    more research is still to come.
                  </Typography>
                </div>
              </Grid>
              <Spacer height={20} />

              <Grid rowCount={1}>
                <div className="col-start-2 col-main lg:col-start-3 lg:col-end-13">
                  <Grid
                    rowCount={1}
                    className="grid-cols-1 lg:grid-flow-col lg:grid-cols-3 lg:gap-20"
                  >
                    {CASE_STUDIES_DATA.map((caseStudy, index) => (
                      <div key={index}>
                        <div className={`${pageStyles.KeylineBottom} mb-8`}>
                          <img
                            {...srcSet(caseStudy.logo, 'png', [300, 600])}
                            className="w-auto h-16"
                            alt=""
                            loading="lazy"
                            width="330"
                            height="50"
                          />
                        </div>
                        <Typography Element="h3" variant="h6" className="mb-5">
                          {caseStudy.title}
                        </Typography>
                        <Typography>{caseStudy.summary}</Typography>
                      </div>
                    ))}
                  </Grid>
                </div>
              </Grid>
            </div>
            <div className="bg-sand-light">
              <ProductAccolades />
            </div>
            <BetterSleepBanner />
            <ScrollTeaser />
            {/* End: Case Studies */}
          </PageContainer>
        </MainContent>

        <Footer />
      </div>
    </div>
  );
};

MeetTheCommunity.pageName = 'Meet the Community';
MeetTheCommunity.isSormusCompatible = true;

export default MeetTheCommunity;
