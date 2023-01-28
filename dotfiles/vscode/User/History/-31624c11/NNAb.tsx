import cx from 'classnames';
import debounce from 'lodash/debounce';
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { dprSrcSet } from '../../../utils/imageHelpers';
import Typography from '../Typography';
import styles from './ImageScroller.module.scss';

interface ImageScrollerProps {
  items: {
    path: string;
    format: string;
    alt?: string;
    caption?: string;
    loading?: 'lazy' | 'eager';
  }[];
  onScroll?: () => void;
  width?: number;
  offscreen?: boolean; // optional flag to hide/show images with a transition
  imagesClassName?: string;
  scrollbarClassName?: string;
}

const ImageScroller = ({
  items,
  onScroll,
  width = 400,
  offscreen,
  imagesClassName,
  scrollbarClassName,
}: ImageScrollerProps): JSX.Element => {
  const container = useRef(null);
  const list = useRef(null);
  const scrollbar = useRef(null);

  const [{ isGrabbing, pos }, setState] = useState({
    isGrabbing: false,
    pos: {
      left: 0,
      x: 0,
    },
  });

  const grab = (e: MouseEvent) => {
    console.log('grab');
    setState({
      isGrabbing: true,
      pos: {
        left: container.current.scrollLeft,
        x: e.clientX,
      },
    });
  };

  const release = useCallback(() => {
    console.log('release');
    if (typeof onScroll === 'function') {
      onScroll();
    }

    setState((state) => ({ ...state, isGrabbing: false }));
  }, [onScroll]);

  const move = useCallback(
    ({ clientX }) => {
      console.log('move');
      const dx = clientX - pos.x;

      container.current.scrollLeft = pos.left - dx;
      scrollbar.current.scrollLeft = pos.left - dx;
    },
    [pos],
  );

  const removeListeners = useCallback(
    (el) => {
      el.removeEventListener('mousemove', move, {
        dataTransfer: { drag: true },
      });
      el.removeEventListener('mouseup', release);
      el.removeEventListener('mouseleave', release);
    },
    [move, release],
  );

  useEffect(() => {
    const el = container.current;

    // change cursor
    el.style.cursor = isGrabbing ? 'grabbing' : 'grab';

    // add/remove listeners
    if (isGrabbing) {
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseup', release);
      el.addEventListener('mouseleave', release);
    } else {
      removeListeners(el);
    }

    return () => {
      removeListeners(el);
    };
  }, [isGrabbing, release, move, removeListeners]);

  useEffect(() => {
    const containerEl = container.current;
    const scrollbarEl = scrollbar.current;

    scrollbarEl.addEventListener(
      'scroll',
      () => (containerEl.scrollLeft = scrollbarEl.scrollLeft),
    );
    containerEl.addEventListener(
      'scroll',
      () => (scrollbarEl.scrollLeft = containerEl.scrollLeft),
    );
  }, []);

  // Helper to left-align first image with scrollbar element
  const [listStyles, setListStyles] = useState({
    paddingLeft: 0,
    paddingRight: 0,
  });

  useEffect(() => {
    // use margin (not padding) so the mirror gets the width of the actual list
    const updateMargin = () => {
      const { left, right } = scrollbar?.current.getBoundingClientRect();

      setListStyles({
        paddingLeft: left ?? 0,
        paddingRight: right ? window.innerWidth - right : 0,
      });
    };

    updateMargin(); // update once, on load

    const debounceUpdate = debounce(updateMargin, 50);
    window.addEventListener('resize', debounceUpdate);

    return () => {
      window.removeEventListener('resize', debounceUpdate);
    };
  }, [scrollbar]);

  return (
    /* use fragment, to give control of the layout to the consumer */
    <>
      <div
        className={cx(imagesClassName, styles.container)}
        ref={container}
        onMouseDown={grab}
        onMouseLeave={release}
        tabIndex={0} // TODO: fix this better...........
        role="button"
        aria-label="Image Scroller"
      >
        <div className={styles.fuck} style={listStyles}>
          <ul ref={list} className={cx(styles.list)}>
            {items.map((item, index) => (
              <li
                className={cx(styles.imageWrap, {
                  [styles.offscreen]: offscreen,
                })}
                key={`image-${index}`}
              >
                <img
                  className={styles.image}
                  {...dprSrcSet(item.path, item.format, width)}
                  alt={item.alt ?? ''}
                  loading={item.loading ?? 'lazy'}
                  draggable="false"
                />
                {item.caption && <Typography>{item.caption}</Typography>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={cx(styles.scrollbar, scrollbarClassName)} ref={scrollbar}>
        <div /* mirror element, for scrollbar */
          className={styles.mirror}
          style={{
            width: list?.current
              ? list?.current.getBoundingClientRect().width
              : 'auto',
          }}
        />
      </div>
    </>
  );
};

export default ImageScroller;
