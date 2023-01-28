import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSlideshow } from './Slideshow';
import styles from './Slideshow.module.scss';

/*
  onEntered can be used as an alternative to
  setting a ref and an animation event listener 
  to do an action on animation
 */
interface SlideshowCurrentContentProps {
  onEntered?: () => void;
}

export const SlideshowCurrentContent = ({
  onEntered = () => {},
}: SlideshowCurrentContentProps) => {
  const { items, currentIndex, nextItem } = useSlideshow();
  const [playInAnimation, setPlayAnimation] = useState(false);

  useEffect(() => {
    setPlayAnimation(true);
  }, [nextItem]);

  useEffect(() => {
    setPlayAnimation(false);
  }, [currentIndex]);

  return (
    <CSSTransition
      in={playInAnimation}
      timeout={0}
      onEntered={onEntered}
      classNames={{
        enterActive: styles.SlideshowSlideIn,
        enterDone: styles.SlideshowSlideIn,
        exitActive: styles.SlideshowSlideOut,
        exitDone: styles.SlideshowSlideOut,
      }}
    >
      {items[currentIndex].content()}
    </CSSTransition>
  );
};
