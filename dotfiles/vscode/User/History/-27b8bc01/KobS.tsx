import {
  Slideshow,
  SlideshowCurrentMedia,
  SlideshowNavigation,
} from '../Slideshow/index';
import { SlideshowItem } from '../Slideshow/typeDefs';
import styles from './SlideshowKaksi.module.scss';

interface SlideshowKaksiProps {
  items: SlideshowItem[];
  onNavNext: (index: number) => void;
  onNavPrev: (index: number) => void;
  interval?: number;
  imageLoading?: 'lazy';
  className?: string;
}

const SlideshowKaksi = ({
  items,
  onNavNext,
  onNavPrev,
  imageLoading,
  interval = 0,
  className,
}: SlideshowKaksiProps): JSX.Element => {
  return (
    <Slideshow
      items={items}
      onNavNext={onNavNext}
      onNavPrev={onNavPrev}
      interval={interval}
      imageLoading={imageLoading}
    >
      <div className={styles.SlideshowKaksi + className ? ` ${className}` : ''}>
        <div className={styles.SlideshowKaksi__CurrentMedia}>
          <SlideshowCurrentMedia />
        </div>
        <div className={styles.SlideshowKaksi__Navigation}>
          <SlideshowNavigation />
        </div>
      </div>
    </Slideshow>
  );
};

export default SlideshowKaksi;
