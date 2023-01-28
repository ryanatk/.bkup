import React from 'react';
import {
  getCurrentItemIndex,
  getNextItemIndex,
  getPrevItemIndex,
} from './helpers';
import { useSlideshow } from './Slideshow';
import styles from './Slideshow.module.scss';
import { SlideshowImage } from './SlideshowImage';
import { SlideshowThumbnailsProps } from './typeDefs';

export const SlideshowThumbnails = ({
  showCurrent = false,
  className = '',
}: SlideshowThumbnailsProps) => {
  const { items, currentIndex, nextItem, handleThumbnailClick } =
    useSlideshow();

  const isCurrentItem = (newIndex: number) =>
    showCurrent && newIndex === currentIndex;

  return (
    <div className={`flex flex-row-reverse ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={item.src + index}>
          {!showCurrent && index === 0 ? null : (
            <div
              className={styles.SlideshowThumbnail}
              onClick={() => {
                const newIndex = getCurrentItemIndex(
                  index,
                  currentIndex,
                  items,
                );

                // Prevent current item from being clicked
                if (isCurrentItem(newIndex)) return;

                handleThumbnailClick(newIndex);
              }}
            >
              <SlideshowImage
                current={items[getCurrentItemIndex(index, currentIndex, items)]}
                next={
                  items[
                    getNextItemIndex(
                      index,
                      currentIndex,
                      items,
                      nextItem.offset,
                    )
                  ]
                }
                prev={
                  items[
                    getPrevItemIndex(
                      index,
                      currentIndex,
                      items,
                      nextItem.offset,
                    )
                  ]
                }
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
