import cx from 'classnames';
import {
  createContext,
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';
import { getNextIndex, getPrevIndex } from './helpers';
import styles from './Slideshow.module.scss';
import {
  SlideshowContextProps,
  SlideshowItem,
  SlideshowProps,
  SLIDESHOW_DIRECTION_BACKWARD,
  SLIDESHOW_DIRECTION_FORWARD,
} from './typeDefs';

const SlideshowContext = createContext<SlideshowContextProps | undefined>(
  undefined,
);

const Slideshow = ({
  children,
  className = '',
  items,
  startingIndex = 0,
  interval = 7000,
  onNavNext,
  onNavPrev,
  imageLoading,
  darkMode = false,
  resetOnItemsChange = true,
}: SlideshowProps): JSX.Element => {
  console.log({ startingIndex });
  const intervalTimer = useRef(null);
  const [slidesTransitioning, setSlidesTransitioning] = useState(false);

  // combines state to avoid race conditions (was causing a "flicker")
  const [{ currentIndex, refreshImages, nextItem }, setState] = useState(
    () => ({
      currentIndex: startingIndex,
      refreshImages: false,
      nextItem: {
        index: 0,
        direction: SLIDESHOW_DIRECTION_FORWARD,
        offset: 1,
      },
    }),
  );
  // helper fn for combined state updates (sugar)
  const updateState = (stateUpdates) =>
    setState((prevState) => ({ ...prevState, stateUpdates }));

  const itemsRef: MutableRefObject<SlideshowItem[]> = useRef(items);

  const handleNext = useCallback(() => {
    const newCurrentIndex = getNextIndex(currentIndex, items);

    updateState({
      nextItem: {
        index: newCurrentIndex,
        direction: SLIDESHOW_DIRECTION_FORWARD,
        offset: 1,
      },
    });

    if (onNavNext) onNavNext(newCurrentIndex);
  }, [currentIndex, items, onNavNext]);

  const handlePrev = () => {
    const newCurrentIndex = getPrevIndex(currentIndex, items);

    updateState({
      nextItem: {
        index: newCurrentIndex,
        direction: SLIDESHOW_DIRECTION_BACKWARD,
        offset: 1,
      },
    });

    if (onNavPrev) onNavPrev(newCurrentIndex);
  };

  const handleThumbnailClick = (newCurrentIndex: number) => {
    // Get offset difference between clicked slide and current slide
    const offset = newCurrentIndex - currentIndex;

    // Determine direction
    const direction =
      newCurrentIndex < currentIndex
        ? SLIDESHOW_DIRECTION_BACKWARD
        : SLIDESHOW_DIRECTION_FORWARD;

    updateState({
      nextItem: {
        index: newCurrentIndex,
        direction,
        offset: offset < 0 ? offset * -1 : offset,
      },
    });
  };

  useEffect(() => {
    if (!interval) return;
    if (intervalTimer.current) clearInterval(intervalTimer.current);

    intervalTimer.current = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(intervalTimer.current);
  }, [currentIndex, handleNext, interval]);

  // Reset slideshow if images (items) prop changes
  // This is necessary UX for PDP product slideshow
  useEffect(() => {
    if (resetOnItemsChange) {
      if (itemsRef?.current) {
        const hasSameImages = itemsRef.current.some(({ src }) =>
          items.some((item) => item.src === src),
        );

        if (!hasSameImages) {
          updateState({
            currentIndex: 0,
            nextItem: {
              index: 0,
              direction: SLIDESHOW_DIRECTION_FORWARD,
              offset: 1,
            },
            refreshImages: true,
          });
          itemsRef.current = items;
        } else {
          updateState({ refreshImages: false });
        }
      }
    }
  }, [itemsRef, items, resetOnItemsChange]);

  /**
   * TODO: this should likely be moved to a hook
   * to be used consistently around the site
   *
   * something like:
   *   `const { defaultText } = useColor()`
   * OR
   *   `const textColor = useTextColor({ darkMode })`
   *
   * depending on how else we want to leverage the new hook
   * (could possibly return a config full of conditional colors)
   */
  const isHorizon = checkFeatureFlag('enable-horizon');

  return (
    <SlideshowContext.Provider
      value={{
        items,
        currentIndex,
        handlePrev,
        handleNext,
        handleThumbnailClick,
        nextItem,
        refreshImages,
        setCurrentIndex: (i) => updateState({ currentIndex: i }),
        imageLoading,
        slidesTransitioning,
        setSlidesTransitioning,
      }}
    >
      <div
        className={cx(
          styles.Slideshow,
          {
            [styles['Slideshow--DarkMode']]: darkMode,
            [styles['Slideshow--Horizon']]: isHorizon && !darkMode,
          },
          className,
        )}
      >
        {children}
      </div>
    </SlideshowContext.Provider>
  );
};

const useSlideshow = () => useContext(SlideshowContext);

export { Slideshow, useSlideshow };
