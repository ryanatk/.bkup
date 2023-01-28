import {
  CSSProperties,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import useMeasure from '../../../../hooks/useMeasure';

interface UseStickyHeaderOptions {
  showAlways?: boolean;
  threshold?: number;
}

interface UseStickyHeaderState {
  sticky: boolean;
  pinned: boolean;
  measuredRef: Ref<HTMLElement>;
  wrapperStyles: CSSProperties;
}

const DEFAULT_OPTIONS: UseStickyHeaderOptions = {
  showAlways: false,
  threshold: 5,
};

const useStickyHeader = (
  options: UseStickyHeaderOptions = {},
): UseStickyHeaderState => {
  const { showAlways, threshold } = Object.assign({}, DEFAULT_OPTIONS, options);
  const scrollTicking = useRef(false);
  const [sticky, setSticky] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [wrapperStyles, setWrapperStyles] = useState<CSSProperties>({
    transition: null,
  });
  const { rect, measuredRef } = useMeasure();

  // Throttle scroll listener: https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event#scroll_event_throttling
  const handleScroll = useCallback(() => {
    if (!scrollTicking.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollingUp = currentScrollY < lastScrollY;

        const shouldSticky =
          !sticky && rect.height > 0 && currentScrollY > rect.bottom;
        const shouldUnsticky = sticky && currentScrollY <= 0;
        const shouldPin =
          !pinned && scrollingUp && lastScrollY - currentScrollY >= threshold;
        const shouldUnpin =
          pinned && !scrollingUp && currentScrollY - lastScrollY >= threshold;
        if (shouldSticky) {
          setSticky(true);
        }
        if (shouldUnsticky) {
          setSticky(false);
        }
        if ((sticky || shouldSticky) && shouldPin) {
          setPinned(true);
        }
        if (!sticky || shouldUnsticky || shouldUnpin) {
          setPinned(false);
        }
        setLastScrollY(currentScrollY);
        scrollTicking.current = false;
      });
      scrollTicking.current = true;
    }
  }, [
    scrollTicking,
    lastScrollY,
    threshold,
    rect.height,
    rect.bottom,
    sticky,
    pinned,
  ]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (sticky && !wrapperStyles.transition) {
      // Delay setting transition to avoid initial slide up
      setTimeout(() => {
        setWrapperStyles({
          transition: '0.3s all ease-in-out',
        });
      }, 10);
    }
    if (!sticky && wrapperStyles.transition) {
      setWrapperStyles({
        transition: null,
      });
    }
  }, [sticky, wrapperStyles]);

  return { sticky, pinned, measuredRef, wrapperStyles };
};

export default useStickyHeader;
