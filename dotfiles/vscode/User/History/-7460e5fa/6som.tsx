import cx from 'classnames';
import { ReactElement, useState } from 'react';
import { config, useSpring } from 'react-spring';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { Grid, LearnMore, Waypoint } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import { Typ } from './components';
import { LEARN_MORE } from './data';

const BusinessLearnMore = (): ReactElement => {
  const isMediumScreen = useMediaQuery(`(min-width: ${breakpoints.medium}px)`);
  const [titleVisible, setTitleVisible] = useState(false);

  const titleSpring =
    useSpring({
      opacity: titleVisible ? 1 : 0,
      transform: `translate3d(0, ${titleVisible ? '0' : '15%'}, 0)`,
      config: { ...config.molasses },
    }) ?? {};

  return (
    <Grid>
      <Waypoint
        bottomOffset="33%"
        topOffset={0}
        onEnter={() => {
          if (!titleVisible) setTitleVisible(true);
        }}
      />

      <header
        style={titleSpring}
        className={cx(
          'text-center mb-8 lg:mb-14',
          'col-main md:col-start-3 md:col-end-13',
        )}
      >
        <h2 className="flex flex-col items-center">
          <Typ
            variant="eyebrow"
            Element="span"
            className="uppercase tracking-wide"
          >
            Sleep, Activity, and Readiness
          </Typ>
          <span className="hidden">: </span>
          <Typ
            variant={isMediumScreen ? 'h1' : 'h2'}
            Element="span"
            className="mb-4"
          >
            Oura Scores explained.
          </Typ>
        </h2>
      </header>

      <div className="text-helsinkiBlue col-main lg:col-start-3 lg:col-end-13">
        <LearnMore list={LEARN_MORE} />
      </div>
    </Grid>
  );
};

export default BusinessLearnMore;
