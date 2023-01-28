import { useEffect, useState } from 'react';
import { useSlideshow } from './Slideshow';

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

  return items[currentIndex].content();
};
