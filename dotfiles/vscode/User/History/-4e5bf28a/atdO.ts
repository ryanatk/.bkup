import Utils from '../utils/utils';

interface CountryListItem {
  label: string;
  value: string;
}

interface Options {
  filter?: () => [];
  sellTo?: boolean;
}

export const useCountries = (options: Options): CountryListItem[] => {};

export function useSellToCountries(ignoreFilter?: boolean): CountryListItem[] {
  const sortFn = (a, b) => a.label.localeCompare(b.label);
  const list: CountryListItem[] =
    Utils.getSellToCountriesList(ignoreFilter).sort(sortFn);

  return list;
}
