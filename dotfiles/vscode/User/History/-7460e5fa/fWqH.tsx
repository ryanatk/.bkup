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
        {/* eyebrow="business_learn_more_eyebrow" */}

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

      <LearnMore list={LEARN_MORE} />
    </Grid>
  );
};

export default BusinessLearnMore;
