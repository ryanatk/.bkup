import cx from 'classnames';
import { ReactElement, useState } from 'react';
import { a, config, useSpring } from 'react-spring';
import { t } from '../../../public/locales/LocaleContext';
import { Grid, LearnMore, Waypoint } from '../../sormus';
import { Eyebrow, Typ } from './components';
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
    <Grid Element="section" className="py-20">
      <Waypoint
        bottomOffset="33%"
        topOffset={0}
        onEnter={() => {
          if (!titleVisible) setTitleVisible(true);
        }}
      />

      <a.header
        style={titleSpring}
        className={cx(
          'text-center mb-2 lg:mb-7',
          'max-w-2xl mx-auto',
          'col-main md:col-start-3 md:col-end-13',
        )}
      >
        <h2 className="flex flex-col items-center gap-4 mb-4">
          <Eyebrow bold>{t('business_learn_more_eyebrow')}</Eyebrow>
          <span className="hidden">: </span>
          <Typ variant="h2" Element="span">
            {t('business_learn_more_title')}
          </Typ>
        </h2>

        <Typ variant="h6" weight="normal">
          {t('business_learn_more_body')}
        </Typ>
      </a.header>

      <Typ Element="div" className="col-main lg:col-start-3 lg:col-end-13">
        <LearnMore list={LEARN_MORE} />
      </Typ>
    </Grid>
  );
};

export default BusinessLearnMore;
