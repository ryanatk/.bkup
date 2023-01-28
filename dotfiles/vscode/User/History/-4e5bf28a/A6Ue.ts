import Utils, { Country } from '../utils/utils';

interface CountryListItem {
  label: string;
  value: string;
}

interface Options {
  sortKey?: 'label';
  filter?: (country: Country) => boolean;
}

const DEFAULT_OPTIONS = {
  sortKey: 'label',
  filter: () => true,
};

export const useCountries = (options: Options = {}): CountryListItem[] => {
  const { sortKey, filter } = Object.assign({}, DEFAULT_OPTIONS, options);
  const sortFn = sortKey
    ? (a, b) => a[sortKey].localeCompare(b[sortKey])
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
