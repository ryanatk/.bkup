import { ReactNode } from 'react';

export const SLIDESHOW_DIRECTION_FORWARD = 'forward';
export const SLIDESHOW_DIRECTION_BACKWARD = 'backward';

export type SlideshowDirection =
  | typeof SLIDESHOW_DIRECTION_FORWARD
  | typeof SLIDESHOW_DIRECTION_BACKWARD;

export interface SlideshowItem {
  src?: string;
  shortSrc?: string;
  originalSrc?: string;
  responsiveWidths?: number[];
  width?: number;
  alt?: string;
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
}

export interface SlideshowThumbnailsProps {
  showCurrent?: boolean;
  className?: string;
}

export interface SlideshowImageProps {
  current: SlideshowItem;
  next: SlideshowItem;
  prev: SlideshowItem;
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
  imageLoading?: 'lazy';
}
