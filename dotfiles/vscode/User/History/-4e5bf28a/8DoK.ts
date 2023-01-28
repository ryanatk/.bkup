import Utils from '../utils/utils';

interface CountryListItem {
  label: string;
  value: string;
}

interface Options {
  sortKey?: 'label';
  filter?: () => [] | ;
  sellTo?: boolean;
}

const DEFAULT_OPTIONS = {
  sortKey: 'label',
}

export const useCountries = (options: Options = {}): CountryListItem[] => {
  const {sortKey} = Object.assign({}, DEFAULT_OPTIONS, options)
  const sortFn = sortKey ? (a, b) => a[sortKey].localeCompare(b[sortKey]) : () => 0;
  const list: CountryListItem[] =
    Utils.getSellToCountriesList().sort(sortFn);

  return list;
};

export function useSellToCountries(): CountryListItem[] {
  const sortFn = (a, b) => a.label.localeCompare(b.label);
  const list: CountryListItem[] =
    Utils.getSellToCountriesList().sort(sortFn);

  return list;
}
