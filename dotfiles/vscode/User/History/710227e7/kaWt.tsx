import cx from 'classnames';
import { clamp } from 'lodash';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { useA11yContext } from '../../../contexts/A11yContext';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { src } from '../../../utils/imageHelpers';
import { Grid, Image, Waypoint } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import styles from './BusinessSolutions.module.scss';
import { Em, Title } from './components';
import { SOLUTIONS_IMAGES } from './data';

const BusinessSolutions = (): ReactElement => {
  const isMediumScreen = useMediaQuery(`(min-width: ${breakpoints.medium}px)`);
  const { prefersReducedMotion } = useA11yContext();
  const doNotAnimate = prefersReducedMotion || !isMediumScreen;

  const [isOnScreen, setIsOnScreen] = useState(false);
  const [state, setState] = useState({
    containerX: isMediumScreen ? 200 : 330, // show more for mobile (because we won't animate)
    windowY: 0,
    listWidth: 0,
  });

  const scrollContainer = useRef(null);
  const imagesList = useRef(null);

  // scroll the container when the state changes
  useEffect(() => {
    scrollContainer.current.scrollLeft = state.containerX;
  }, [state.containerX]);

  // update state when the user side-scrolls the container
  useEffect(() => {
    if (prefersReducedMotion || !isMediumScreen) {
      return;
    }

    const updateContainerX = () => {
      setState((prevState) => ({
        ...prevState,
        containerX: scrollContainer.current.scrollLeft,
      }));
    };

    scrollContainer.current.addEventListener('scroll', updateContainerX, {
      passive: true,
    });

    return () => window.removeEventListener('scroll', updateContainerX);
  }, [isMediumScreen, prefersReducedMotion]);

  // update state when the user scrolls down the window
  useEffect(() => {
    if (prefersReducedMotion || !isMediumScreen) {
      return;
    }

    const updateWindowY = () => {
      const scrollSpeed = 0.7;

      setState(({ containerX, windowY, listWidth }) => {
        const scroll = containerX + (window.scrollY - windowY) * scrollSpeed;
        const maxScroll = listWidth - window.innerWidth;

        return {
          containerX: clamp(scroll, 0, maxScroll),
          windowY: window.scrollY,
          listWidth: imagesList.current?.getBoundingClientRect().width ?? 0,
        };
      });
    };

    if (isOnScreen) {
      setState((prevState) => ({
        ...prevState,
        windowY: window.scrollY,
      }));

      window.addEventListener('scroll', updateWindowY, { passive: true });
    } else {
      window.removeEventListener('scroll', updateWindowY);
    }

    return () => window.removeEventListener('scroll', updateWindowY);
  }, [isOnScreen, isMediumScreen, prefersReducedMotion]);

  return (
    <Waypoint
      onEnter={() => setIsOnScreen(true)}
      onLeave={() => setIsOnScreen(false)}
      topOffset="-10%"
      bottomOffset="10%"
    >
      <div className="relative bg-sand-light mb-40 py-20 md:py-36">
        <Grid>
          <Title
            className={cx(
              'col-start-2 col-end-5',
              'md:col-start-3 md:col-end-13',
              'z-10', // so it sits on top of the images list, below
            )}
          >
            {t('business_solutions_title', {
              i(chunks) {
                return <Em>{chunks}</Em>;
              },
            })}
          </Title>
        </Grid>

        <div className={cx(styles.container)} ref={scrollContainer}>
          <ul className={cx(styles.list)} ref={imagesList}>
            {SOLUTIONS_IMAGES.map(({ path, format, alt }) => (
              <li className={cx(styles.imageWrap)} key={`image-${path}`}>
                <Image
                  className={styles.image}
                  src={src(path, format, isMediumScreen ? 330 : 200)}
                  alt={alt ?? ''}
                  loading={'lazy'}
                  draggable="false"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Waypoint>
  );
};

export default BusinessSolutions;
