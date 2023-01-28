import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { breakpoints } from '../components/sormus/constants';
import { SlideshowItem } from '../components/sormus/Slideshow/typeDefs';
import { MessageKey } from '../public/locales/setup';
import useMediaQuery from './useMediaQuery';

type Breakpoint = 'small' | 'medium' | 'large' | 'xlarge';

export interface IntlSlideshowItem extends SlideshowItem {
  alt: MessageKey;
}

const useSlideshowItems = (
  data: IntlSlideshowItem[],
  breakpoint: Breakpoint = 'large',
): SlideshowItem[] => {
  const { formatMessage } = useIntl();
  const matchLargeScreen = useMediaQuery(
    `(min-width: ${breakpoints[breakpoint]}px)`,
  );

  const itemsForBreakpoint = useMemo<SlideshowItem[]>(
    () =>
      data.map(({ alt, src, mobileSrc, ...item }) => ({
        ...item,
        src: matchLargeScreen ? src : mobileSrc ?? src,
        alt: formatMessage({ id: alt }),
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

export default useSlideshowItems;
