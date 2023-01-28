import cx from 'classnames';
import { ReactElement, useState } from 'react';
import { config, useSpring } from 'react-spring';
import { Grid, LearnMore, Waypoint } from '../../sormus';
import { Typ } from './components';
import { LEARN_MORE } from './data';

const BusinessLearnMore = (): ReactElement => {
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
        topOffset={null}
        onEnter={() => {
          if (!titleVisible) setTitleVisible(true);
        }}
      />

      <header
        style={titleSpring}
        className="col-main flex flex-col items-center mb-8 md:col-start-3 md:col-end-13 lg:col-start-4 lg:col-end-12 lg:mb-14"
      >
        <Typ
          Element="h2"
          variant="h2"
          color="inherit"
          weight="light"
          className="mb-4 text-center"
        >
          Oura Scores explained.
        </Typ>
      </header>

      <div className={cx('col-main lg:col-start-3 lg:col-end-13')}>
        <LearnMore list={LEARN_MORE} />
      </div>
    </Grid>
  );
};

export default BusinessLearnMore;
