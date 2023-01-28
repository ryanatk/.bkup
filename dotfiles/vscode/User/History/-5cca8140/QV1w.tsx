import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import { a, config, useSpring } from 'react-spring';
import { Waypoint } from 'react-waypoint';
import { EventType, sendSegmentTrack } from '../../../../analytics';
import { useA11yContext } from '../../../../contexts/A11yContext';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import usePDPUrl from '../../../../hooks/usePDPUrl';
import { t } from '../../../../public/locales/LocaleContext';
import { MessageKey } from '../../../../public/locales/setup';
import { src } from '../../../../utils/imageHelpers';
import { Button, Grid, Image, Typography } from '../../../sormus';
import { ButtonProps } from '../../../sormus/Button';
import { breakpoints } from '../../../sormus/constants';
import styles from './HealthJourneyBanner.module.scss';

interface Props {
  title?: MessageKey;
  cta?: MessageKey;
  ctaProps?: ButtonProps;
  className?: string;
}

const HealthJourneyBanner = ({
  title = 'health_journey_banner_title',
  cta = 'health_journey_banner_cta',
  ctaProps: ctaButtonProps,
  className,
}: Props): JSX.Element => {
  const matchMediumScreen = useMediaQuery(
    `(min-width: ${breakpoints.medium}px)`,
  );
  const { prefersReducedMotion } = useA11yContext();
  const [contentVisible, setContentVisible] = useState(false);
  const pdpUrl = usePDPUrl();
  const contentSpring = useSpring({
    opacity: contentVisible ? 1 : 0,
    transform: `translate3d(0, ${contentVisible ? '0' : '20%'}, 0)`,
    config: { ...config.molasses },
  });

  const ctaProps = ctaButtonProps ?? {
    // defaults to "shop now" link to pdp
    href: pdpUrl,
    link: true,
    onClick: () => {
      sendSegmentTrack({
        type: EventType.CTAClicked,
        payload: {
          cta: 'shop_now',
          action: 'go_to_pdp',
          location: 'body',
          module: 'health_journey_banner',
        },
      });
    },
  };

  return (
    <Grid className={className}>
      <div className="col-full lg:px-6">
        <ParallaxBanner className={styles.Banner}>
          <ParallaxBannerLayer
            speed={-10}
            easing="ease"
            disabled={prefersReducedMotion || !matchMediumScreen}
          >
            <Image
              src={
                matchMediumScreen
                  ? src(
                      'simple-home/d-home-shop-cta-img-xl@2x',
                      'jpg',
                      2000,
                      's',
                    )
                  : src(
                      'simple-home/m-home-shop-cta-img-xl@2x',
                      'jpg',
                      1024,
                      's',
                    )
              }
              alt=""
              loading="lazy"
              className={styles.BackgroundImage}
            />
          </ParallaxBannerLayer>
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
                  color="white"
                  variant="h2"
                  weight="light"
                  className={styles.Title}
                >
                  <FormattedMessage
                    id={title}
                    values={{
                      i(chunks) {
                        return <em className="font-serif">{chunks}</em>;
                      },
                    }}
                  />
                </Typography>
                <Button
                  variant="secondary"
                  size="large"
                  data-cy="health-journey-banner-cta"
                  {...ctaProps}
                >
                  {t(cta)}
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
