import Utils, { Country } from '../utils/utils';

interface CountryListItem {
  label: string;
  value: string;
}

interface Options {
  sortKey?: 'label';
  filter?: (country: Country) => boolean;
}

export const useCountries = ({
  sortKey,
  filter,
}: Options = {}): CountryListItem[] => {
  const sortFn = sortKey
    ? (a: CountryListItem, b: CountryListItem) =>
        a[sortKey].localeCompare(b[sortKey])
    : () => 0;
  const list: CountryListItem[] = Utils.getCountriesList(filter).sort(sortFn);

  return list;
};

export function useSellToCountries(): CountryListItem[] {
  return useCountries({
    sortKey: 'label',
    filter: ({ sellTo }) => Boolean(sellTo),
  });
}
