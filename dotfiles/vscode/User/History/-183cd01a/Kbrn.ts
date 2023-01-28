import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { breakpoints } from '../components/sormus/constants';
import { SlideshowItem } from '../components/sormus/Slideshow/typeDefs';
import { MessageKey } from '../public/locales/setup';
import useMediaQuery from './useMediaQuery';

export interface StoriesSlideshowItem extends SlideshowItem {
  alt: MessageKey;
}

const useSlideshowItems = (data: StoriesSlideshowItem[]): SlideshowItem[] => {
  const { formatMessage } = useIntl();
  const matchLargeScreen = useMediaQuery(`(min-width: ${breakpoints.large}px)`);

  const itemsForBreakpoint = useMemo<SlideshowItem[]>(
    () =>
      data.map((item) => ({
        ...item,
        src: matchLargeScreen ? item.src : item.mobileSrc,
        alt: formatMessage({ id: item.alt }),
      })),
    [matchLargeScreen, data, formatMessage],
  );

  const [slideShowItems, setSlideshowItems] =
    useState<SlideshowItem[]>(itemsForBreakpoint);

  useEffect(() => {
    setSlideshowItems(itemsForBreakpoint);
  }, [matchLargeScreen, itemsForBreakpoint]);

  return slideShowItems;
};

export default useStoriesSlideItems;
