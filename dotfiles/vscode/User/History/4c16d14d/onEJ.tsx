import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import cx from 'classnames';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
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
    // cache the element, so it still exists during cleanup (return function below)
    const { current } = nextImageEl ?? {};

    if (!current) return;

    const animationStart = () => {
      setSlidesTransitioning(true);
    };

    const animationEnd = () => {
      setSlidesTransitioning(false);
      setCurrentIndex(parseInt(current.dataset.nextIndex));
    };

    current.addEventListener('animationstart', animationStart);
    current.addEventListener('animationend', animationEnd);

    return () => {
      current.removeEventListener('animationstart', animationStart);
      current.removeEventListener('animationend', animationEnd);
    };
  }, [nextImageEl, setCurrentIndex, setSlidesTransitioning]);

  /**
   * Do not change the "next item" during the animation,
   * because it causes a flicker
   * Instead wait until the animation is complete,
   * so the new "current image" will already be showing.
   */

  // easy callback to use for initializing state & within useEffect
  const getNextImageProps = useCallback(
    () =>
      passthroughImageProps(
        nextItem.direction === SLIDESHOW_DIRECTION_FORWARD ? next : prev,
      ),
    [next, prev, nextItem],
  );

  // state to hold props for the next image
  const [nextImageProps, setNextImageProps] = useState(getNextImageProps());

  // change the next image once playAnimation is complete
  useEffect(() => {
    if (!playAnimation) {
      setNextImageProps(getNextImageProps());
    }
  }, [playAnimation, setNextImageProps, getNextImageProps]);

  return (
    <div
      className={styles.SlideshowImage}
      style={{
        outline: '1px solid blue',
        outlineOffset: '5px',
        outlineColor: playAnimation ? 'red' : 'blue',
      }}
    >
      <Image
        {...passthroughImageProps(current)}
        data-next-index={nextItem.index}
        className={cx(styles.SlideshowCurrent, {
          [styles.SlideshowWipeOut]: playAnimation,
        })}
        loading={imageLoading}
      />

      <Image
        forwardedRef={nextImageEl}
        {...nextImageProps}
        className={cx(styles.SlideshowReveal, {
          [styles.SlideshowRevealActive]: playAnimation,
        })}
        aria-hidden={!playAnimation}
        data-next-index={nextItem.index}
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
