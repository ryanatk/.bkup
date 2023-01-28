import cx from 'classnames';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { src } from '../../../utils/imageHelpers';
import { Grid, Image } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import { Em, Subtitle, Title } from './components';

export const ExperienceHero = (): JSX.Element => {
  const isMediumScreen = useMediaQuery(`(min-width: ${breakpoints.medium}px)`);
  const isLargeScreen = useMediaQuery(`(min-width: ${breakpoints.large}px)`);

  return (
    <section
      className={cx(
        'flex flex-col justify-between gap-10',
        'md:h-screen lg:h-auto lg:min-h-screen',
        'pt-3 md:pt-5 md:pb-24',
        'bg-sand text-grayMedium',
      )}
      id="hero"
    >
      <Grid className="gap-y-2 md:gap-y-5">
        <div
          className={cx(
            'col-start-2 col-end-6',
            'md:col-start-4 md:col-end-13',
          )}
        >
          <Title h1>
            <FormattedMessage
              id="experience_hero_title"
              values={{
                i(chunks) {
                  return <Em>{chunks}</Em>;
                },
              }}
            />
          </Title>
        </div>

        <div
          className={cx(
            'row-start-2 col-start-3 col-end-6',
            'md:col-start-6 md:col-end-13 lg:col-end-11',
          )}
        >
          <Subtitle small>{t('experience_hero_subtitle')}</Subtitle>
        </div>
      </Grid>

      <div
        className={cx(
          'self-end overflow-hidden',
          'w-full md:w-10/12 pt-5',
          'flex items-center',
        )}
      >
        <Image
          className="object-cover"
          src={
            isLargeScreen
              ? src('experience/d-oe-hero-img@2x', 'jpg', 1800)
              : src(
                  'experience/m-oe-hero-img@2x',
                  'jpg',
                  isMediumScreen ? breakpoints.large : breakpoints.medium,
                )
          }
          alt=""
          loading="eager"
        />
      </div>
    </section>
  );
};

export default ExperienceHero;
