import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Item } from './index';

const useImages = (images: Item[]): Item[] => {
  const { formatMessage } = useIntl();

  const items = useMemo<Item[]>(
    () =>
      images.map(({ alt, ...item }) => ({
        ...item,
        alt: formatMessage({ id: alt }),
      })),
    [images, formatMessage],
  );

  return items;
};

export default useImages;
