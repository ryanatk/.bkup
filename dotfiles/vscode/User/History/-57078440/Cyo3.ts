import { Ref, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  config,
  Interpolation,
  SpringValue,
  to,
  useSpring,
} from 'react-spring';
import useMeasure from '../../../../hooks/useMeasure';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import { breakpoints } from '../../../sormus/constants';

const useMissionImagesScrollAnimation = (
  visible = false,
): {
  ref: Ref<HTMLDivElement>;
  styles: { [x: string]: Interpolation | SpringValue };
} => {
  const matchLargeScreen = useMediaQuery(`(min-width: ${breakpoints.large}px)`);
  const { rect, measuredRef } = useMeasure<HTMLDivElement>();

  const [spring, springApi] = useSpring(() => ({
    opacity: 1,
    x: 0,
    config: { ...config.molasses },
  }));

  const start = useMemo(() => {
    const windowHeight = window.innerHeight;

    return window.scrollY + rect.top - windowHeight * 0.6667;
  }, [rect.top]);

  const end = useMemo(() => {
    const windowHeight = window.innerHeight;

    return window.scrollY + rect.bottom - windowHeight * 0.5;
  }, [rect.bottom]);

  const startX = useMemo(() => {
    if (matchLargeScreen) {
      return 0;
    } else {
      return rect.width * 0.1;
    }
  }, [rect.width, matchLargeScreen]);

  const distanceX = useMemo(() => {
    const windowWidth = window.innerWidth;

    if (matchLargeScreen) {
      return Math.min(windowWidth * 0.25, 150);
    } else {
      return -(windowWidth - 12 - rect.width * 1.2);
    }
  }, [rect.width, matchLargeScreen]);

  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const progress = Math.min(
          Math.max((window.scrollY - start) / (end - start), 0),
          1,
        );
        springApi({ x: startX - progress * distanceX });
        ticking.current = false;
      });

      ticking.current = true;
    }
  }, [springApi, ticking, start, end, startX, distanceX]);

  useEffect(() => {
    springApi({ opacity: visible ? 1 : 0 });
  }, [visible, springApi]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {
    ref: measuredRef,
    styles: {
      opacity: spring.opacity,
      transform: to([spring.x], (x) => `translate3d(${x}px, 0, 0)`),
    },
  };
};

export default useMissionImagesScrollAnimation;
