import cx from 'classnames';
import { clamp } from 'lodash';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { useA11yContext } from '../../../contexts/A11yContext';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { src } from '../../../utils/imageHelpers';
import { Grid, Image, Waypoint } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import styles from './BusinessSolutions.module.scss';
import { Em, Title } from './components';
import { SOLUTIONS_IMAGES } from './data';

const BusinessSolutions = (): ReactElement => {
  const isMediumScreen = useMediaQuery(`(min-width: ${breakpoints.medium}px)`);
  const { prefersReducedMotion } = useA11yContext();

  const [isOnScreen, setIsOnScreen] = useState(false);
  const [state, setState] = useState({
    containerX: 200,
    windowY: 0,
    listWidth: 0,
  });

  const scrollContainer = useRef(null);
  const imagesList = useRef(null);

  // scroll the container when the state changes
  useEffect(() => {
    scrollContainer.current.scrollLeft = state.containerX;
  }, [state.containerX, prefersReducedMotion]);

  // update state when the user side-scrolls the container
  useEffect(() => {
    const updateContainerX = () => {
      setState((prevState) => ({
        ...prevState,
        containerX: scrollContainer.current.scrollLeft,
      }));
    };

    scrollContainer.current.addEventListener('scroll', updateContainerX);

    return () => window.removeEventListener('scroll', updateContainerX);
  }, []);

  // update state when the user scrolls down the window
  useEffect(() => {
    const updateWindowY = () => {
      const scrollSpeed = isMediumScreen ? 0.7 : 0.4;

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

      if (!prefersReducedMotion) {
        window.addEventListener('scroll', updateWindowY);
      }
    } else {
      window.removeEventListener('scroll', updateWindowY);
    }

    return () => window.removeEventListener('scroll', updateWindowY);
  }, [isOnScreen, isMediumScreen]);

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
            Proactive,
            <br />
            performance-driven <Em>wellness solutions</Em>.
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
