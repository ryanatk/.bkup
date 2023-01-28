import { Waypoint } from 'react-waypoint';
import { useScrollTeaserContext } from '../../../contexts/ScrollTeaserProvider';
import { VariantId } from '../../../hooks/useGoogleOptimizeVariant';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { src } from '../../../utils/imageHelpers';
import { Grid, Typography } from '../../sormus';
import { breakpoints, IMAGE_MAX_WIDTH } from '../../sormus/constants';
import { HeroButton } from '../bilbo/BilboHero';
import styles from './Hero.module.scss';
import { SectionProps } from './types';

const MOBILE_IMAGES = {
  [VariantId.Zero]: 'heart-rate-female-mobile',
  [VariantId.One]: 'heart-rate-female-mobile',
  [VariantId.Two]: 'heart-rate-female-mobile',
  [VariantId.Three]: 'gold-ring-sands-mobile',
  [VariantId.Four]: 'ring-pulse-mobile',
  [VariantId.Five]: 'rings-display-mobile',
};

const DESKTOP_IMAGES = {
  [VariantId.Zero]: 'heart-rate-female-desktop',
  [VariantId.One]: 'heart-rate-female-desktop',
  [VariantId.Two]: 'heart-rate-female-desktop',
  [VariantId.Three]: 'gold-ring-sand-desktop',
  [VariantId.Four]: 'ring-pulse-desktop',
  [VariantId.Five]: 'rings-display-desktop',
};

const Banner = ({
  children,
  headerHeight,
  isMinWidthMedium,
  media,
  withMaskOverlay,
}) => {
  return (
    <div
      className={`${styles.AdHeroBanner} ${
        withMaskOverlay ? styles['AdHeroBanner--WithMaskOverlay'] : ''
      }`}
    >
      <img
        src={
          media.srcDesktop && isMinWidthMedium ? media.srcDesktop : media.src
        }
        srcSet={
          media.srcSetDesktop && isMinWidthMedium
            ? media.srcSetDesktop
            : media.srcSet
        }
        alt={media.alt || ''}
        loading={media.loading || 'eager'}
        className={styles.AdHeroBanner__Image}
        data-image-type={isMinWidthMedium ? 'desktop' : 'default'}
      />
      <div
        className={styles.AdHero__ContentCompartment}
        style={!isMinWidthMedium ? { top: `${headerHeight}px` } : {}}
      >
        <Grid>
          <div className={styles.AdHeroBanner__Content}>{children}</div>
        </Grid>
      </div>
    </div>
  );
};

export const Hero = ({ headerHeight, variant }: SectionProps) => {
  const setIsScrollTeaserVisible = useScrollTeaserContext();
  const isMinWidthMedium = useMediaQuery(`(min-width:${breakpoints.medium}px)`);

  const mobileImageString = MOBILE_IMAGES[variant ?? VariantId.Zero];
  const desktopImageString = DESKTOP_IMAGES[variant ?? VariantId.Zero];
  const withMaskOverlay =
    variant === VariantId.Three ||
    variant === VariantId.Four ||
    variant === VariantId.Five;

  return (
    <Waypoint
      scrollableAncestor={window}
      bottomOffset="20%"
      topOffset="60%"
      onLeave={() => setIsScrollTeaserVisible(false)}
      onEnter={() => setIsScrollTeaserVisible(true)}
    >
      <div style={{ marginTop: `-${headerHeight}px` }} className="text-white">
        <div className={styles.AdHero}>
          <Banner
            headerHeight={headerHeight}
            isMinWidthMedium={isMinWidthMedium}
            media={{
              src: src(`ad/${mobileImageString}`, 'jpg', breakpoints.medium),
              srcDesktop: src(
                `ad/${desktopImageString}`,
                'jpg',
                IMAGE_MAX_WIDTH,
              ),
            }}
            withMaskOverlay={withMaskOverlay}
          >
            <div className={styles.AdHero__TextCompartment}>
              <Typography
                Element="h1"
                variant="h1"
                className={styles.AdHero__Title}
                color="inherit"
              >
                {isMinWidthMedium ? (
                  <>
                    <span>{t('hero_title_ad_landing_prefix')}</span>
                    {t('hero_title_ad_landing')}
                  </>
                ) : (
                  <>{t('hero_title_ad_landing_mobile')}</>
                )}
              </Typography>
              <Typography className={styles.AdHero__Teaser} color="inherit">
                {t('hero_teaser_ad_landing')}
              </Typography>
            </div>
            <div className={styles.AdHero__ButtonDesktop}>
              <HeroButton label={'header_shop_now'} />
            </div>
          </Banner>
        </div>
      </div>
    </Waypoint>
  );
};

export default Hero;
