import cx from 'classnames';
import { ReactElement } from 'react';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { Grid, QuoteCard } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import { ContactButton, Em, ParallaxImage, Title, Typ } from './components';
import { QUOTES } from './data';

const BusinessHero = (): ReactElement => {
  const isMediumScreen = useMediaQuery(`(min-width: ${breakpoints.medium}px)`);

  return (
    <section className="gap-y-5">
      <Grid className="bg-sand-light">
        <header
          className={cx(
            'col-main md:col-start-3 md:col-end-13',
            'flex flex-col lg:flex-row gap-6 lg:gap-8',
            'items-start lg:items-end',
            'py-2 lg:pb-9',
          )}
        >
          <Title h1>
            <Em>Empower</Em> your organization with Oura.
          </Title>

          <ContactButton
            text="Connect with us"
            size="normal"
            className="lg:mb-3"
          />
        </header>
      </Grid>

      <Grid
        style={{
          background: 'linear-gradient(#FFC0CB 50%, #FFF 50%)',
        }}
      >
        <div
          className={cx(
            'col-main md:col-start-3 md:col-end-13',
            'row-start-2',
            'mb-40 md:mb-20',
            'relative',
          )}
        >
          <div style={{ height: isMediumScreen ? '34rem' : '24rem' }}>
            {/* TODO: update the height */}
            <ParallaxImage className="h-full" />
          </div>

          <Typ
            Element="div"
            className={cx(
              'absolute left-5 right-5 -bottom-32',
              'md:left-auto md:-right-4 md:-bottom-12',
              'md:w-full md:max-w-md lg:w-1/2',
            )}
          >
            <QuoteCard {...QUOTES[0]} color="inherit" bg="sand-light" />
          </Typ>
        </div>
      </Grid>

      <Grid>
        <Typ
          variant={isMediumScreen ? 'h5' : 'body'}
          Element="h2"
          className={cx('row-start-3', 'col-main md:col-start-3 md:col-end-6')}
        >
          Insights that transform.
        </Typ>

        <Typ
          variant={isMediumScreen ? 'h4' : 'h5'}
          className={cx(
            'row-start-4 md:row-start-3',
            'col-main md:col-start-6 md:col-end-13',
          )}
        >
          Daily health insights and trends empower individuals and teams to be
          proactive about their health and performance. With a highly accurate
          wearable, intuitive app, and thoughtful B2B solutions, wellness is
          within reach with Oura for Business.
        </Typ>
      </Grid>
    </section>
  );
};

export default BusinessHero;
