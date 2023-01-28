import { useState } from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';
import { a, config, useSpring } from 'react-spring';
import { Waypoint } from 'react-waypoint';
import { useA11yContext } from '../../../../contexts/A11yContext';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import { t } from '../../../../public/locales/LocaleContext';
import { src } from '../../../../utils/imageHelpers';
import { Button, Grid, Typography } from '../../../sormus';
import { breakpoints } from '../../../sormus/constants';
import styles from './HealthJourneyBanner.module.scss';

const HORIZON_PDP_PATH = '/product/horizon-silver';

const HealthJourneyBanner = (): JSX.Element => {
  const matchLargeScreen = useMediaQuery(`(min-width: ${breakpoints.large}px)`);
  const matchXLargeScreen = useMediaQuery(
    `(min-width: ${breakpoints.xlarge}px)`,
  );
  const { prefersReducedMotion } = useA11yContext();
  const [contentVisible, setContentVisible] = useState(false);
  const imageSrc = src(
    'simple-home/d-m07-shop-banner-bg-img@2x',
    'jpg',
    matchLargeScreen ? (matchXLargeScreen ? 3000 : 2000) : 1024,
  );
  const contentSpring = useSpring({
    opacity: contentVisible ? 1 : 0,
    transform: `translate3d(0, ${contentVisible ? '0' : '20%'}, 0)`,
    config: { ...config.molasses },
  });
  return (
    <Grid className="bg-sand lg:px-6">
      <div className="col-full">
        <ParallaxBanner
          className={styles.Banner}
          layers={[
            {
              image: imageSrc,
              speed: prefersReducedMotion ? 0 : -20,
            },
          ]}
        >
          <Grid className={styles.ContentGrid}>
            <a.div
              style={contentSpring}
              className="col-main md:col-start-4 md:col-end-12 lg:col-start-3 lg:col-end-13"
            >
              <Waypoint
                bottomOffset="33.333%"
                onEnter={() => {
                  if (!contentVisible) setContentVisible(true);
                }}
              />
              <div className="max-w-xs md:max-w-md px-2 lg:-ml-8">
                <Typography
                  color="helsinkiBlue-dark"
                  variant="h2"
                  weight="light"
                  className="mb-6"
                >
                  {t('health_journey_banner_title', {
                    em: (
                      <em className="font-serif">
                        {t('health_journey_banner_title_em')}
                      </em>
                    ),
                  })}
                </Typography>
                <Button
                  variant="secondary"
                  data-cy="health-journey-banner-cta"
                  href={HORIZON_PDP_PATH}
                  link={true}
                >
                  {t('health_journey_banner_cta')}
                </Button>
              </div>
            </a.div>
          </Grid>
        </ParallaxBanner>
      </div>
    </Grid>
  );
};

export default HealthJourneyBanner;
