import { useState } from 'react';
import Carousel, {
  ArrowProps,
  CarouselProps,
  DotProps,
  ResponsiveType,
} from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Waypoint } from 'react-waypoint';
import { RESPONSIVE_DATA } from './constants';
export type { DotProps };
export type { ResponsiveType };
export type { ArrowProps };

export interface SwipeableCarouselProps extends CarouselProps {
  autoPlayWhenVisible?: boolean;
}

export const SwipeableCarousel = ({
  autoPlayWhenVisible = false,
  responsive = RESPONSIVE_DATA,
  children,
  ...props
}: SwipeableCarouselProps) => {
  const [autoPlayInView, setAutoPlayInView] = useState(false);

  const autoPlay =
    props.autoPlay && autoPlayWhenVisible ? autoPlayInView : props.autoPlay;

  return (
    <Waypoint
      scrollableAncestor={window}
      onEnter={() => setAutoPlayInView(true)}
      onLeave={() => setAutoPlayInView(false)}
    >
      <div>
        <Carousel autoPlay={autoPlay} responsive={responsive} {...props}>
          {children}
        </Carousel>
      </div>
    </Waypoint>
  );
};

export default SwipeableCarousel;
