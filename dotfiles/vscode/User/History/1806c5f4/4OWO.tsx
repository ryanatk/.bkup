import { ReactElement } from 'react';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import { useA11yContext } from '../../../../contexts/A11yContext';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import { src } from '../../../../utils/imageHelpers';
import { Image } from '../../../sormus';
import { breakpoints } from '../../../sormus/constants';

interface Props {
  className: string;
}

// TODO: this needs work. just a placeholder for now.

const ParallaxImage = ({ className }: Props): ReactElement => {
  const { prefersReducedMotion } = useA11yContext();
  const matchMediumScreen = useMediaQuery(
    `(min-width: ${breakpoints.medium}px)`,
  );

  return (
    <ParallaxBanner className={className}>
      <ParallaxBannerLayer
        speed={-10}
        easing="ease"
        disabled={prefersReducedMotion || !matchMediumScreen}
      >
        <Image
          src={
            matchMediumScreen
              ? src('simple-home/d-home-shop-cta-img-xl@2x', 'jpg', 2000)
              : src('simple-home/m-home-shop-cta-img-xl@2x', 'jpg', 1024)
          }
          alt=""
          loading="lazy"
          className="w-full h-full object-cover object-center"
        />
      </ParallaxBannerLayer>
    </ParallaxBanner>
  );
};

export default ParallaxImage;