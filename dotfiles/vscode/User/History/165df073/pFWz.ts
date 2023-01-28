import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import { breakpoints } from '../../../sormus/constants';
import { SlideshowItem } from '../../../sormus/Slideshow/typeDefs';
import { StoriesSlideshowItem } from '../data/storiesData';

const useStoriesSlideItems = (
  data: StoriesSlideshowItem[],
): SlideshowItem[] => {
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
