import { ReactElement, ReactNode, useState } from 'react';
import { config, useSpring } from 'react-spring';
import { Waypoint } from 'react-waypoint';
import { Grid, Typography } from '../../sormus';
import LearnMoreBlock, { LearnMoreBlockProps } from './LearnMoreBlock';

interface Props {
  title?: ReactNode;
  list: LearnMoreBlockProps[];
  children?: ReactNode;
}

const LearnMore = ({ title, list, children }: Props): ReactElement => {
  const [titleVisible, setTitleVisible] = useState(false);

  const titleSpring =
    useSpring({
      opacity: titleVisible ? 1 : 0,
      transform: `translate3d(0, ${titleVisible ? '0' : '15%'}, 0)`,
      config: { ...config.molasses },
    }) ?? {};

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
          {title}
        </Typography>

        {children}
      </header>

      <div className="col-main lg:col-start-3 lg:col-end-13">
        <ul className="flex flex-wrap gap-14 max-w-md mx-auto lg:(gap-20 max-w-none)">
          {list.map((item) => (
            <li
              className="flex-grow-0 flex-shrink-0 w-full lg:(flex-1 w-auto)"
              key={`learn-more-block-${item.title + item.image.alt}`}
            >
              <LearnMoreBlock {...item} />
            </li>
          ))}
        </ul>
      </div>
    </Grid>
  );
};

export default LearnMore;
