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
        'bg-sand text-grayMedium',
        'pt-3 h-screen md:pt-5 md:pb-24',
        'flex flex-col justify-between gap-10',
      )}
      id="hero"
    >
      <Grid className="gap-y-2 md:gap-y-5">
        <div className="col-start-2 col-end-6 md:col-start-4 md:col-end-13">
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

        <div className="row-start-2 col-start-3 col-end-6 md:col-start-6 md:col-end-13 lg:col-end-10">
          <Subtitle small>{t('experience_hero_subtitle')}</Subtitle>
        </div>
      </Grid>

      <div className="w-10/12 self-end pt-5 md:col-start-4 overflow-hidden flex items-center">
        <Image
          src={
            isLargeScreen
              ? src('experience/d-hero-img-oe2x', 'jpg', 1800)
              : src(
                  'experience/m-hero-img-oe2x',
                  'jpg',
                  isMediumScreen ? breakpoints.large : breakpoints.medium,
                )
          }
          alt=""
          loading="eager"
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default ExperienceHero;