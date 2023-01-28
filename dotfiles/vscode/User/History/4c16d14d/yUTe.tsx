import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import cx from 'classnames';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { a, useSpring } from 'react-spring';
import getPDPUrl from '../../../utils/getPDPUrl';
import IconButtonAnimated from '../IconButtonAnimated';
import Image from '../Image';
import { useSlideshow } from './Slideshow';
import styles from './Slideshow.module.scss';
import {
  SlideshowImageProps,
  SlideshowItem,
  SLIDESHOW_DIRECTION_FORWARD,
} from './typeDefs';

/* 
  alt is not required to use a slideshow 
  but is if you plan to use an image.
*/
interface SlideShowAltRequiredItem
  extends Pick<
    SlideshowItem,
    'src' | 'shortSrc' | 'originalSrc' | 'responsiveWidths' | 'width'
  > {
  alt: string;
}

function passthroughImageProps(item: SlideshowItem): SlideShowAltRequiredItem {
  // Properties that we pass from the SlideshowItem object into the <Image>.
  return {
    src: item.src,
    shortSrc: item.shortSrc,
    originalSrc: item.originalSrc,
    responsiveWidths: item.responsiveWidths,
    width: item.width,
    alt: item.alt,
  };
}

export const SlideshowImage = ({
  current,
  next,
  prev,
  isThumbnail = false,
}: SlideshowImageProps) => {
  const nextImageEl = useRef(null);
  const [playAnimation, setPlayAnimation] = useState(false);
  const {
    nextItem,
    setCurrentIndex,
    currentIndex,
    refreshImages,
    imageLoading,
    slidesTransitioning,
    setSlidesTransitioning,
  } = useSlideshow();
  const { formatMessage } = useIntl();
  const showShopCta = !isThumbnail && !slidesTransitioning;
  const shopCtaSpring = useSpring({
    opacity: showShopCta ? 1 : 0,
    transform: `scale3d(${showShopCta ? 1 : 0}, ${showShopCta ? 1 : 0}, 1)`,
  });

  useEffect(() => {
    setPlayAnimation(true);
  }, [nextItem]);

  useEffect(() => {
    setPlayAnimation(false);
  }, [currentIndex, refreshImages]);

  useEffect(() => {
    if (!nextImageEl.current) return;

    nextImageEl.current.addEventListener('animationstart', () => {
      setSlidesTransitioning(true);
    });

    nextImageEl.current.addEventListener('animationend', () => {
      setSlidesTransitioning(false);
      setCurrentIndex(parseInt(nextImageEl.current.dataset.nextIndex));
    });
  }, [nextImageEl, setCurrentIndex, setSlidesTransitioning]);

  // wait for `refreshImages` to finish before removing class styles, to avoid flicker
  const isSwappingImages =
    playAnimation || refreshImages || slidesTransitioning;

  return (
    <div className={styles.SlideshowImage}>
      <Image
        forwardedRef={nextImageEl}
        {...passthroughImageProps(
          nextItem.direction === SLIDESHOW_DIRECTION_FORWARD ? next : prev,
        )}
        className={cx(styles.SlideshowReveal, {
          [styles.SlideshowRevealActive]: playAnimation,
        })}
        aria-hidden={!playAnimation}
        data-next-index={nextItem.index}
        loading={imageLoading}
      />

      <Image
        {...passthroughImageProps(current)}
        data-next-index={nextItem.index}
        className={cx(styles.SlideshowCurrent, {
          [styles.SlideshowWipeOut]: playAnimation,
        })}
        loading={imageLoading}
      />

      {!!current.shopCta && (
        <Link href={getPDPUrl(current.shopCta.color)}>
          <a.span
            className="inline-block absolute left-4 bottom-4"
            style={shopCtaSpring}
          >
            <IconButtonAnimated
              icon={<ShoppingCartOutlinedIcon />}
              label={formatMessage({ id: current.shopCta.label })}
            />
          </a.span>
        </Link>
      )}
    </div>
  );
};
