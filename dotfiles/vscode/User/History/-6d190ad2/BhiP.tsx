import { Waypoint } from 'react-waypoint';
import { useScrollTeaserContext } from '../../../contexts/ScrollTeaserProvider';
import { t } from '../../../public/locales/LocaleContext';
import { src } from '../../../utils/imageHelpers';
import { Banner, Typography } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import { HeroButton } from '../bilbo/BilboHero';
import styles from './Hero.module.scss';
import { SectionProps } from './types';

export const Hero = ({ headerHeight }: SectionProps) => {
  const setIsScrollTeaserVisible = useScrollTeaserContext();

  return (
    <Waypoint
      scrollableAncestor={window}
      bottomOffset="20%"
      topOffset="60%"
      onLeave={() => setIsScrollTeaserVisible(false)}
      onEnter={() => setIsScrollTeaserVisible(true)}
    >
      <div style={{ marginTop: `-${headerHeight}px` }} className="text-white">
        <div className={styles.SleepHero}>
          <Banner
            contentLeft
            media={{
              type: 'image',
              src: src(`sleep/sleep-mobile-hero`, 'jpg', breakpoints.medium),
              srcDesktop: src(`sleep/sleep-desktop-hero`, 'jpg'),
            }}
          >
            <div className={styles.SleepHero__TextCompartment}>
              <Typography
                Element="h1"
                variant="h1"
                className={styles.SleepHero__Title}
                color="inherit"
              >
                Oura Ring
              </Typography>
              <Typography
                Element="h2"
                variant="h2"
                className={styles.SleepHero__Subtitle}
                color="inherit"
              >
                {t('oura_difference_sleep_label')}.
              </Typography>
            </div>
            <div className={styles.SleepHero__Button}>
              <HeroButton label={'header_shop_now'} />
            </div>
          </Banner>
        </div>
      </div>
    </Waypoint>
  );
};

export default Hero;
