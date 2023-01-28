import Utils from '../utils/utils';

interface CountryListItem {
  label: string;
  value: string;
}

export function useSellToCountries(ignoreFilter?: boolean): CountryListItem[] {
  const sortFn = (a, b) => a.label.localeCompare(b.label);
  const list: CountryListItem[] =
    Utils.getSellToCountriesList(ignoreFilter).sort(sortFn);

  return list;
}
