import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { a, config, useSpring } from 'react-spring';
import { Waypoint } from 'react-waypoint';
import tw from 'twin.macro';
import useSlideshowItems from '../../../hooks/useSlideshowItems';
import { Grid, SlideshowYksi, Typography } from '../../sormus';
import storiesData from './data/storiesData';

const Section = tw.section`
bg-sand
  pb-20
  xl:pb-24
`;

const TitleWrapper = tw(a.div)`
  col-main
  md:(col-start-4 col-end-12)
  lg:(col-start-5 col-end-11)
`;

const SlideshowWrapper = tw(a.div)`
  col-main
  md:(col-start-4 col-end-12)
  lg:col-full
`;

const Stories = (): JSX.Element => {
  const slideshowItems = useSlideshowItems(storiesData);
  const [titleVisible, setTitleVisible] = useState(false);
  const [slideshowVisible, setSlideshowVisible] = useState(false);
  const titleSpring = useSpring({
    opacity: titleVisible ? 1 : 0,
    transform: `translate3d(0, ${titleVisible ? '0' : '10%'}, 0)`,
  });
  const slideshowSpring = useSpring({
    opacity: titleVisible ? 1 : 0,
    config: { ...config.molasses },
  });
  return (
    <Section>
      <Grid className="gap-y-8 lg:gap-y-20">
        <TitleWrapper style={titleSpring}>
          <Waypoint
            bottomOffset="33%"
            onEnter={() => {
              if (!titleVisible) setTitleVisible(true);
            }}
          />
          <Typography
            Element="h2"
            variant="h2"
            color="inherit"
            weight="light"
            className="text-center"
          >
            <FormattedMessage
              id="simple_home_stories_title"
              values={{
                i(chunks) {
                  return <em className="font-serif">{chunks}</em>;
                },
              }}
            />
          </Typography>
        </TitleWrapper>
        <SlideshowWrapper style={slideshowSpring}>
          <Waypoint
            bottomOffset="33%"
            onEnter={() => {
              if (!slideshowVisible) setSlideshowVisible(true);
            }}
          />
          <SlideshowYksi
            className="text-helsinkiBlue-dark"
            items={slideshowItems}
          />
        </SlideshowWrapper>
      </Grid>
    </Section>
  );
};

export default Stories;
