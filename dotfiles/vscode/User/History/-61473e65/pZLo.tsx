import { Waypoint } from 'react-waypoint';
import { useScrollTeaserContext } from '../../../contexts/ScrollTeaserProvider';
import useMediaQuery from '../../../hooks/useMediaQuery';
import IconArrowBack from '../../../svg/design-tokens/icon_arrow_chevron_back.svg';
import IconArrowForward from '../../../svg/design-tokens/icon_arrow_chevron_forward.svg';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';
import { src } from '../../../utils/imageHelpers';
import { ContentWrapperProps } from '../../sormus/Banner';
import { breakpoints } from '../../sormus/constants';
import Icon from '../../sormus/Icon';
import SwipeableCarousel, {
  ArrowProps,
  DotProps,
  ResponsiveType,
} from '../../sormus/SwipeableCarousel';
import BilboHero from '../bilbo/BilboHero';
import styles from './Hero.module.scss';
import SleepCampaignHero from './SleepCampaignHero';

// magic number. Parent/child elements same height.
const HERO_HEIGHT = 812;

const RESPONSIVE_DATA: ResponsiveType = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: breakpoints.large,
    },
    items: 1,
  },
  tablet: {
    breakpoint: {
      max: breakpoints.large,
      min: breakpoints.medium,
    },
    items: 1,
  },
  mobile: {
    breakpoint: {
      max: breakpoints.medium,
      min: 0,
    },
    items: 1,
  },
};

const heroSrc = {
  small: src('homepage/m-hero-variant-2@2x', 'jpg', breakpoints.medium),
  desktop: src('homepage/d-bilbo-hero-mask@2x', 'jpg'),
};

interface HeroProps {
  headerHeight: number;
}

const LeftArrow = ({ onClick }: ArrowProps) => (
  <button
    onClick={onClick}
    className={`${styles.Hero__CarouselArrows} ${styles['Hero__CarouselArrows--left']}`}
  >
    <Icon outlined size="large">
      <IconArrowBack />
    </Icon>
  </button>
);

const RightArrow = ({ onClick }: ArrowProps) => (
  <button
    onClick={onClick}
    className={`${styles.Hero__CarouselArrows} ${styles['Hero__CarouselArrows--right']}`}
  >
    <Icon outlined size="large">
      <IconArrowForward />
    </Icon>
  </button>
);

const CarouselDot = ({ active, index, onClick }: DotProps) => (
  <li
    className={`${styles.Hero__CarouselDot} ${
      active ? styles['Hero__CarouselDot--active'] : ''
    }`}
    onClick={onClick}
    aria-label={`Jump to slide ${index + 1}`}
  />
);

export const Hero = ({ headerHeight }: HeroProps) => {
  const showCarousel = checkFeatureFlag('show-sleep-hero-carousel');
  const isMinWidthMedium = useMediaQuery(`(min-width:${breakpoints.medium}px)`);
  const setIsScrollTeaserVisible = useScrollTeaserContext();

  const ContentWrapper = ({ children }: ContentWrapperProps) => (
    <div
      className={styles.Hero__ContentCompartment}
      style={!isMinWidthMedium ? { top: `${headerHeight}px` } : {}}
    >
      {children}
    </div>
  );

  const DefaultHero = () => (
    <BilboHero
      buttonLabel={'header_shop_now'}
      contentWrapper={ContentWrapper}
      heroHeight={!isMinWidthMedium && HERO_HEIGHT}
      teaserText="hero_teaser_variant_two"
      title="hero_title_variant_one"
      media={{
        type: 'image',
        src: src('homepage/m-hero-variant-2@2x', 'jpg', breakpoints.medium),
        srcDesktop: src('homepage/d-bilbo-hero-mask@2x', 'jpg'),
        loading: 'eager',
      }}
    />
  );

  return (
    <Waypoint
      scrollableAncestor={window}
      bottomOffset="20%"
      topOffset="60%"
      onLeave={() => setIsScrollTeaserVisible(false)}
      onEnter={() => setIsScrollTeaserVisible(true)}
    >
      <div
        style={{ marginTop: `-${headerHeight}px` }}
        className="max-h-screen text-white"
      >
        {showCarousel ? (
          <SwipeableCarousel
            autoPlay={isMinWidthMedium}
            shouldResetAutoplay={isMinWidthMedium}
            autoPlaySpeed={6000}
            infinite
            keyBoardControl
            dotListClass={styles.Hero__CarouselList}
            containerClass={styles.Hero__CarouselContainer}
            customDot={<CarouselDot />}
            showDots={isMinWidthMedium}
            responsive={RESPONSIVE_DATA}
            renderDotsOutside={false}
            transitionDuration={0}
            arrows={!isMinWidthMedium}
            slidesToSlide={1}
            swipeable
            pauseOnHover={false}
            customLeftArrow={<LeftArrow />}
            customRightArrow={<RightArrow />}
          >
            <DefaultHero />
            <SleepCampaignHero isMinWidthMedium={isMinWidthMedium} />
          </SwipeableCarousel>
        ) : (
          <DefaultHero />
        )}
      </div>
    </Waypoint>
  );
};

export default Hero;
