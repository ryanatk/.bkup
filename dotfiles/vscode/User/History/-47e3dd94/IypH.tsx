import { useRouter } from 'next/router';
import { EventType, sendGTMWithSegmentEvent } from '../../../../analytics';
import { t } from '../../../../public/locales/LocaleContext';
import { MessageKey } from '../../../../public/locales/setup';
import slugifyString from '../../../../utils/slugifyString';
import { Banner, Button, Typography } from '../../../sormus';
import {
  ContentWrapperProps,
  MediaImage,
  MediaVideo,
} from '../../../sormus/Banner';
import styles from './BilboHero.module.scss';

interface HeroButtonProps {
  label: MessageKey;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'basic';
}

export const HeroButton = ({
  label,
  variant = 'secondary',
}: HeroButtonProps) => {
  const { asPath } = useRouter();

  const handleAnalytics = () => {
    sendGTMWithSegmentEvent({
      type: EventType.CTAClicked,
      payload: {
        cta: slugifyString(t(label)),
        location: 'hero_module',
        module: 'hero_module',
        path: asPath,
      },
    });
  };

  return (
    <Button
      variant={variant}
      data-cy="hero-button"
      className="w-full md:w-auto"
      href="/product/heritage-silver"
      onClick={handleAnalytics}
      link={true}
    >
      {t(label)}
    </Button>
  );
};

interface BilboHeroProps {
  buttonLabel?: MessageKey | false;
  teaserText: MessageKey;
  buttonHiddenMobile?: boolean;
  contentWrapper?: ({ children }: ContentWrapperProps) => JSX.Element;
  title: MessageKey;
  media: MediaImage | MediaVideo;
  withMaskOverlay?: boolean;
  heroHeight?: number;
  footnoteMarker?: string;
}

const BilboHero = ({
  buttonLabel = 'header_shop_label_upgrade',
  teaserText,
  buttonHiddenMobile = true,
  contentWrapper,
  title,
  media,
  withMaskOverlay = false,
  heroHeight,
  footnoteMarker,
}: BilboHeroProps) => {
  return (
    <div
      className={styles.BilboHero}
      style={heroHeight ? { height: heroHeight } : {}}
    >
      <Banner
        media={media}
        contentLeft
        contentWrapper={contentWrapper}
        backgroundColor="#000"
        withMaskOverlay={withMaskOverlay}
      >
        <div
          className={`transition-opacity duration-1000 opacity-0 ${
            (media.type === 'video' && media.isReady) || media.type === 'image'
              ? 'opacity-100'
              : ''
          }`}
        >
          <div className={styles.BilboHero__TextCompartment}>
            <Typography
              Element="h1"
              variant="h3"
              className={styles.BilboHero__Title}
              color="inherit"
            >
              {t(title)}
            </Typography>
            <Typography className={styles.BilboHero__Teaser} color="inherit">
              {t(teaserText)}
              {footnoteMarker && footnoteMarker}
            </Typography>
          </div>
          {buttonLabel && (
            <div className={styles.BilboHero__ButtonDesktop}>
              <HeroButton label={buttonLabel} />
            </div>
          )}
        </div>
      </Banner>
      {buttonLabel && !buttonHiddenMobile && (
        <div className={styles.BilboHero__ButtonMobile} aria-hidden>
          <HeroButton label={buttonLabel} />
        </div>
      )}
    </div>
  );
};

export default BilboHero;
