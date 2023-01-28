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
    setState({
      isGrabbing: true,
      pos: {
        left: container.current.scrollLeft,
        x: e.clientX,
      },
    });
  };

  const release = useCallback(() => {
    if (typeof onScroll === 'function') {
      onScroll();
    }

    setState((state) => ({ ...state, isGrabbing: false }));
  }, [onScroll]);

  const move = useCallback(
    ({ clientX }) => {
      const dx = clientX - pos.x;

      container.current.scrollLeft = pos.left - dx;
      scrollbar.current.scrollLeft = pos.left - dx;
    },
    [pos],
  );

  useEffect(() => {
    const el = container.current;
    const removeListeners = () => {
      el.removeEventListener('mousemove', move, {
        dataTransfer: { drag: true },
      });
      el.removeEventListener('mouseup', release);
      el.removeEventListener('mouseleave', release);
    };

    // change cursor
    el.style.cursor = isGrabbing ? 'grabbing' : 'grab';

    // add/remove listeners
    if (isGrabbing) {
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseup', release);
      el.addEventListener('mouseleave', release);
    } else {
      removeListeners();
    }

    return () => {
      removeListeners();
    };
  }, [isGrabbing, release, move]);

  // Helper to left-align first image with scrollbar element
  const [listStyles, setListStyles] = useState({
    paddingLeft: 0,
    paddingRight: 0,
  });

  useEffect(() => {
    const updatePadding = () => {
      const { left, right } = scrollbar?.current.getBoundingClientRect();

      setListStyles({
        paddingLeft: left ?? 0,
        paddingRight: right ? window.innerWidth - right : 0,
      });
    };

    updatePadding(); // update once, on load

    const debounceUpdate = debounce(updatePadding, 50);
    window.addEventListener('resize', debounceUpdate);

    return () => {
      window.removeEventListener('resize', debounceUpdate);
    };
  }, [scrollbar]);

  // callback functions to
  const scrollScrollbar = () =>
    (scrollbar.current.scrollLeft = container.current.scrollLeft);
  const scrollContainer = () =>
    (container.current.scrollLeft = scrollbar.current.scrollLeft);

  return (
    /* use fragment, to give control of the layout to the consumer */
    <>
      <div
        className={cx(imagesClassName, styles.container)}
        ref={container}
        onMouseDown={grab}
        onTouchStart={() => {
          // for mobile, remove the other scroll listener before adding new
          scrollbar.current.removeEventListener('scroll', scrollContainer);
          container.current.addEventListener('scroll', scrollScrollbar);
        }}
        onMouseEnter={() => {
          container.current.addEventListener('scroll', scrollScrollbar);
        }}
        onMouseLeave={() => {
          release();
          container.current.removeEventListener('scroll', scrollScrollbar);
        }}
        tabIndex={0} // TODO: fix this better...........
        role="button"
        aria-label="Image Scroller"
      >
        <div className="w-max" style={listStyles}>
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

      <div
        className={cx(styles.scrollbar, scrollbarClassName)}
        ref={scrollbar}
        onTouchStart={() => {
          // for mobile, remove the other scroll listener before adding new
          container.current.removeEventListener('scroll', scrollScrollbar);
          scrollbar.current.addEventListener('scroll', scrollContainer);
        }}
        onMouseEnter={() => {
          scrollbar.current.addEventListener('scroll', scrollContainer);
        }}
        onMouseLeave={() => {
          scrollbar.current.removeEventListener('scroll', scrollContainer);
        }}
      >
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
