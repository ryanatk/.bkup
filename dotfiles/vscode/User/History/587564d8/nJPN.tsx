import Typography from '../Typography';
import VectorImage from '../VectorImage';
import { useSlideshow } from './Slideshow';
import styles from './Slideshow.module.scss';
import { SlideshowNavigationProps } from './typeDefs';

export const SlideshowNavigation = ({
  className = '',
}: SlideshowNavigationProps) => {
  const { items, currentIndex, handleNext, handlePrev, nextItem } =
    useSlideshow();

  const currentSlideNumber = String(currentIndex + 1).padStart(2, '0');
  const totalSlidesCount = String(items.length).padStart(2, '0');

  // Don't show nav if we have 1 item
  if (items.length === 1) return null;

  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <div className="md:order-1 flex-grow md:flex-grow-0 w-24 text-center pl-2">
        <Typography className={styles.SlideshowNavNumbers} color="inherit">
          {currentSlideNumber} &mdash; {totalSlidesCount}
        </Typography>
      </div>

      <div className="md:order-0">
        <button
          aria-label="choose previous slide"
          className={styles.SlideshowNavButton}
          onClick={handlePrev}
          disabled={currentIndex !== nextItem.index}
          data-cy="button-slideshow-prev"
        >
          <VectorImage name="arrow_backward" color="current" width={20} />
        </button>
      </div>

      <div className="order-2">
        <button
          aria-label="choose next slide"
          className={styles.SlideshowNavButton}
          onClick={handleNext}
          disabled={currentIndex !== nextItem.index}
          data-cy="button-slideshow-next"
        >
          <VectorImage name="arrow_forward" color="current" width={20} />
        </button>
      </div>
    </div>
  );
};
