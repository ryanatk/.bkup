import cx from 'classnames';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { EventType, sendSegmentTrack } from '../../../analytics';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { src } from '../../../utils/imageHelpers';
import { Button, Grid, QuoteCard } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import { Em, ParallaxImage, Title, Typ } from './components';
import { QUOTES } from './data';

const BUTTON_LABEL = 'connect with us';

const BusinessHero = (): ReactElement => {
  const isMediumScreen = useMediaQuery(`(min-width: ${breakpoints.medium}px)`);
  const { asPath } = useRouter();

  return (
    <section className="pb-20 md:pb-24">
      <Grid className="pt-8 pb-10 md:pb-16 gap-y-6 bg-sand-light">
        <header
          className={cx(
            'col-main md:col-start-3 md:col-end-13',
            'flex flex-col lg:flex-row gap-6 lg:gap-8',
            'items-start lg:items-end',
          )}
        >
          <Title h1>
            {t('business_hero_title', {
              i(chunks: string[]) {
                return <Em>{chunks}</Em>;
              },
            })}
          </Title>

          <Button
            className="lg:mb-3 whitespace-nowrap capitalize"
            onClick={() => {
              sendSegmentTrack({
                type: EventType.CTAClicked,
                payload: {
                  action: 'go to integration documentation',
                  cta: 'learn more',
                  location: 'hero',
                  text: BUTTON_LABEL,
                  path: asPath,
                },
              });
            }}
          >
            {BUTTON_LABEL}
          </Button>
        </header>
      </Grid>

      <Grid
        style={{ background: 'linear-gradient(#F6F3EF 50%, #FFF 50%)' }}
        className="mb-48 md:mb-24"
      >
        <div className={cx('col-main md:col-start-3 md:col-end-13 relative')}>
          <div style={{ height: isMediumScreen ? '34rem' : '24rem' }}>
            <ParallaxImage
              src={src('business/hero@2x', 'jpg', isMediumScreen ? 1200 : 600)}
              alt="business_hero_alt"
              className="h-full"
            />
          </div>

          <Typ
            Element="div"
            className={cx(
              'absolute left-5 right-5 -bottom-28',
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
          className={cx('col-main md:col-start-3 md:col-end-6')}
        >
          {t('business_hero_heading')}
        </Typ>

        <Typ
          variant={isMediumScreen ? 'h4' : 'h5'}
          className={cx(
            'row-start-2 md:row-start-1',
            'col-main md:col-start-6 md:col-end-13',
          )}
        >
          {t('business_hero_body')}
        </Typ>
      </Grid>
    </section>
  );
};

export default BusinessHero;
