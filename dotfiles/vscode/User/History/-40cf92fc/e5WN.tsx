import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { a, config, useSpring } from 'react-spring';
import { Waypoint } from 'react-waypoint';
import tw from 'twin.macro';
import { EventType, sendSegmentTrack } from '../../../analytics';
import { t } from '../../../public/locales/LocaleContext';
import { Button, Grid, Typography } from '../../sormus';
import learnMoreData from './data/learnMoreData';
import LearnMoreBlock from './LearnMoreBlock';

const Section = tw.section`
  bg-sand
  pb-20
  xl:pb-24
`;

const TitleWrapper = tw(a.div)`
  col-main
  flex
  flex-col
  items-center
  mb-8
  md:(col-start-3 col-end-13)
  lg:(col-start-4 col-end-12 mb-14)
`;

const BlocksWrapper = tw.div`
  col-main
  lg:(col-start-3 col-end-13)
`;

const BlocksList = tw.div`
  flex
  flex-wrap
  gap-14
  max-w-md
  mx-auto
  lg:(gap-20 max-w-none)
`;

const BlocksListItem = tw.div`
  flex-grow-0
  flex-shrink-0
  w-full
  lg:(flex-1 w-auto)
`;

const LearnMore = (): JSX.Element => {
  const [titleVisible, setTitleVisible] = useState(false);
  const titleSpring = useSpring({
    opacity: titleVisible ? 1 : 0,
    transform: `translate3d(0, ${titleVisible ? '0' : '15%'}, 0)`,
    config: { ...config.molasses },
  });

  const handleAnalytics = () => {
    sendSegmentTrack({
      type: EventType.CTAClicked,
      payload: {
        cta: 'learn_more_about_oura',
        action: 'go_to_learn_more',
        location: 'body',
        module: 'learn_more',
      },
    });
  };

  return (
    <Section>
      <Grid>
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
            className="mb-4 text-center"
          >
            <FormattedMessage
              id="simple_home_learn_more_title"
              values={{
                i(chunks) {
                  return <em className="font-serif">{chunks}</em>;
                },
              }}
            />
          </Typography>
          <Button
            data-cy="learn-more-cta"
            variant="tertiary"
            color="helsinkiBlue-dark"
            size="medium"
            href="/about-us"
            link
            onClick={handleAnalytics}
          >
            {t('simple_home_learn_more_cta')}
          </Button>
        </TitleWrapper>

        <BlocksWrapper>
          {/* <BlocksList list={learnMoreData} /> */}
          <BlocksList>
            {learnMoreData.map((block, i) => (
              <BlocksListItem key={`learn-more-block-${i}`}>
                <LearnMoreBlock {...block} />
              </BlocksListItem>
            ))}
          </BlocksList>
        </BlocksWrapper>
      </Grid>
    </Section>
  );
};

export default LearnMore;
