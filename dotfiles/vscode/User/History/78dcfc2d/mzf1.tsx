import { ReactNode } from 'react';
import { t } from '../../../public/locales/LocaleContext';
import { src } from '../../../utils/imageHelpers';
import { Button, Grid, Typography } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import styles from './SleepCampaignHero.module.scss';

export interface MediaImage {
  src: string;
  /** optional src to display on larger screens */
  srcDesktop?: string;
  loading?: 'eager' | 'lazy';
  alt?: string;
}

interface BannerProps {
  children: ReactNode;
  isMinWidthMedium: boolean;
  media: MediaImage;
}

const Banner = ({ children, isMinWidthMedium, media }: BannerProps) => {
  return (
    <div className={styles.SleepCampaignHero}>
      <img
        src={
          media.srcDesktop && isMinWidthMedium ? media.srcDesktop : media.src
        }
        alt={media.alt}
        loading="eager"
        className={styles.SleepCampaignHero__Image}
        data-image-type={isMinWidthMedium ? 'desktop' : 'default'}
      />
      <div className={styles.SleepCampaignHero__ContentCompartment}>
        <Grid>
          <div className={styles.SleepCampaignHero__Content}>{children}</div>
        </Grid>
      </div>
    </div>
  );
};

export const SleepCampaignHero = ({
  isMinWidthMedium,
}: Pick<BannerProps, 'isMinWidthMedium'>) => {
  return (
    <Banner
      isMinWidthMedium={isMinWidthMedium}
      media={{
        src: src(
          'homepage/sleep-campaign-hero-mobile',
          'jpg',
          breakpoints.medium,
        ),
        srcDesktop: src('homepage/sleep-campaign-hero-desktop', 'jpg', 1800),
        alt: 'sleep campaign hero',
      }}
    >
      <div className={styles.SleepCampaignHero__TextCompartment}>
        <Typography
          Element="h1"
          variant="h1"
          className={styles.SleepCampaignHero__Title}
          color="inherit"
        >
          {t('sleep_carousel_hero_title')}
        </Typography>
        <Typography
          className={styles.SleepCampaignHero__Teaser}
          color="inherit"
        >
          {t('sleep_carousel_hero_subtitle')}
        </Typography>
      </div>
      <div className="text-center mx-auto md:text-left md:mx-0">
        <Button
          href="/sleep"
          link
          variant="secondary"
          size={isMinWidthMedium ? 'normal' : 'small'}
        >
          {t('frontpage_learn_more')}
        </Button>
      </div>
    </Banner>
  );
};

export default SleepCampaignHero;
