import cx from 'classnames';
import { ReactElement, useState } from 'react';
import { a, config, useSpring } from 'react-spring';
import { useA11yContext } from '../../../contexts/A11yContext';
import { Grid, LearnMore, Waypoint } from '../../sormus';
import { Eyebrow, Typ } from './components';
import { LEARN_MORE } from './data';

const BusinessLearnMore = (): ReactElement => {
  const [titleVisible, setTitleVisible] = useState(false);
  const { prefersReducedMotion } = useA11yContext();

  const spring =
    useSpring({
      opacity: titleVisible ? 1 : 0,
      transform: `translate3d(0, ${titleVisible ? '0' : '15%'}, 0)`,
      config: { ...config.molasses },
    }) ?? {};

  return (
    <Grid Element="section" className="py-20">
      <Waypoint
        bottomOffset="33%"
        topOffset={0}
        onEnter={() => {
          if (!titleVisible) setTitleVisible(true);
        }}
      />

      <a.header
        style={prefersReducedMotion ? {} : spring}
        className={cx(
          'text-center mb-2 lg:mb-7',
          'max-w-2xl mx-auto',
          'col-main md:col-start-3 md:col-end-13',
        )}
      >
        <h2 className="flex flex-col items-center gap-4 mb-4">
          <Eyebrow>Sleep, Activity, and Readiness</Eyebrow>
          <span className="hidden">: </span>
          <Typ variant="h2" Element="span">
            Oura Scores explained.
          </Typ>
        </h2>

        <Typ variant="h6" weight="normal">
          Oura analyzes real time data to provide insights in three key areas
          that help members optimize their overall health.
        </Typ>
      </a.header>

      <Typ Element="div" className="col-main lg:col-start-3 lg:col-end-13">
        <LearnMore list={LEARN_MORE} />
      </Typ>
    </Grid>
  );
};

export default BusinessLearnMore;
