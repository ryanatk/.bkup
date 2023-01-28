import { ReactNode } from 'react';
import { MessageKey } from '../../../public/locales/setup';

export const SLIDESHOW_DIRECTION_FORWARD = 'forward';
export const SLIDESHOW_DIRECTION_BACKWARD = 'backward';

export type SlideshowDirection =
  | typeof SLIDESHOW_DIRECTION_FORWARD
  | typeof SLIDESHOW_DIRECTION_BACKWARD;

export interface SlideshowItem {
  src?: string;
  shortSrc?: string;
  originalSrc?: string;
  mobileSrc?: string;
  responsiveWidths?: number[];
  width?: number;
  alt?: string;
  shopCta?: {
    color?: string;
    label: MessageKey;
  };
  content: () => ReactNode | HTMLCollection;
}

export interface SlideshowNextItem {
  index: number;
  direction: SlideshowDirection | string;
  offset?: number;
}

export interface SlideshowProps {
  items?: SlideshowItem[];
  startingIndex?: number;
  interval?: number;
  children: React.ReactNode;
  className?: string;
  onNavNext?: (index: number) => void;
  onNavPrev?: (index: number) => void;
  darkMode?: boolean;
  imageLoading?: 'lazy' | 'eager';
  /** optional flag to set the current index to 0 when the items change */
  resetOnItemsChange?: boolean;
}

export interface SlideshowThumbnailsProps {
  showCurrent?: boolean;
  className?: string;
}

export interface SlideshowImageProps {
  current: SlideshowItem;
  next: SlideshowItem;
  prev: SlideshowItem;
  isThumbnail?: boolean;
}

export interface SlideshowNavigationProps {
  className?: string;
}

export interface SlideshowContextProps {
  items: SlideshowItem[];
  currentIndex: number;
  handlePrev: () => void;
  handleNext: () => void;
  handleThumbnailClick: (newCurrentIndex: number) => void;
  nextItem: SlideshowNextItem;
  setCurrentIndex: (currentIndex: number) => void;
  refreshImages: boolean;
  imageLoading?: 'lazy' | 'eager';
  slidesTransitioning: boolean;
  setSlidesTransitioning: (transitioning: boolean) => void;
}
