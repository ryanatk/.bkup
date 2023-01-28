import { ReactElement, ReactNode, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { config, useSpring } from 'react-spring';
import { Waypoint } from 'react-waypoint';
import { EventType, sendSegmentTrack } from '../../../analytics';
import { Grid, Typography } from '../../sormus';
import LearnMoreBlock, { Props as BlockProps } from './LearnMoreBlock';

interface Props {
  list: BlockProps[];
  children?: ReactNode;
}

const LearnMore = ({ list, children }: Props): ReactElement => {
  const [titleVisible, setTitleVisible] = useState(false);
  const titleSpring =
    useSpring({
      opacity: titleVisible ? 1 : 0,
      transform: `translate3d(0, ${titleVisible ? '0' : '15%'}, 0)`,
      config: { ...config.molasses },
    }) ?? {};

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
    <Grid>
      <header
        style={titleSpring}
        className="col-main flex flex-col items-center mb-8 md:col-start-3 md:col-end-13 lg:col-start-4 lg:col-end-12 lg:mb-14"
      >
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

        {children}
      </header>

      <div className="col-main lg:col-start-3 lg:col-end-13">
        <ul className="flex flex-wrap gap-14 max-w-md mx-auto lg:(gap-20 max-w-none)">
          {list.map((block, i) => (
            <li
              className="flex-grow-0 flex-shrink-0 w-full lg:(flex-1 w-auto)"
              key={`learn-more-block-${i}`}
            >
              <LearnMoreBlock {...block} />
            </li>
          ))}
        </ul>
      </div>
    </Grid>
  );
};

export default LearnMore;
