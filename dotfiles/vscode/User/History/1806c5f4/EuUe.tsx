import { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import { useA11yContext } from '../../../../contexts/A11yContext';
import { MessageKey } from '../../../../public/locales/setup';
import { Image } from '../../../sormus';

interface Props {
  src: string;
  alt?: MessageKey;
  className?: string;
}

const ParallaxImage = ({ src, alt, className }: Props): ReactElement => {
  const { prefersReducedMotion } = useA11yContext();
  const matchMediumScreen = useMediaQuery(
    `(min-width: ${breakpoints.medium}px)`,
  );
  const { formatMessage } = useIntl();

  return (
    <ParallaxBanner className={className}>
      <ParallaxBannerLayer
        speed={-10}
        easing="ease"
        disabled={prefersReducedMotion || !matchMediumScreen}
      >
        <Image
          src={src}
          alt={alt ? formatMessage({ id: alt }) : ''}
          loading="lazy"
          className="w-full h-full object-cover object-center"
        />
      </ParallaxBannerLayer>
    </ParallaxBanner>
  );
};

export default ParallaxImage;
