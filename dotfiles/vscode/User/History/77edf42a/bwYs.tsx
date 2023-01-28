import { useMediaQuery } from '@material-ui/core';
import { srcSet } from '../../../utils/imageHelpers';
import { VectorImage } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import styles from './Hero.module.scss';
import { SectionProps } from './types';

export const Hero = ({ headerHeight }: SectionProps) => {
  const mobileImageSrc = srcSet('gucci/m-hero@2x', 'png', [400, 600]).src;
  const desktopImageSrc = srcSet('gucci/d-hero', 'png', [400, 600]).src;

  const matchDesktopScreen = useMediaQuery(
    `(min-width:${breakpoints.large}px)`,
  );

  const matchLargeDesktopScreen = useMediaQuery(
    `(min-width:${breakpoints.large}px)`,
  );

  return (
    <div style={{ marginTop: `-${headerHeight}px` }} className="text-white">
      <div className={styles.GucciHero}>
        <img
          src={matchDesktopScreen ? desktopImageSrc : mobileImageSrc}
          srcSet={matchDesktopScreen ? desktopImageSrc : mobileImageSrc}
          alt={'Gucci x Oura banner image'}
          loading={'eager'}
          className={styles.GucciHero__Image}
          data-image-type={matchDesktopScreen ? 'desktop' : 'default'}
        />
        <div className={styles.GucciHero__Content}>
          <div className={styles.GucciHero__Logo}>
            <VectorImage
              name={matchLargeDesktopScreen ? 'gucci' : 'gucci_mobile'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
