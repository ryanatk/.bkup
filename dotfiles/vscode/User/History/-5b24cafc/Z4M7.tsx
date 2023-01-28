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

  return items[currentIndex].content();
};
