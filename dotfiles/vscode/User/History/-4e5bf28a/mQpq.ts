import Utils from '../utils/utils';

interface CountryListItem {
  label: string;
  value: string;
}

export function useSellToCountries(ignoreFlag?: boolean): CountryListItem[] {
  const sortFn = (a, b) => a.label.localeCompare(b.label);
  const list: CountryListItem[] =
    Utils.getSellToCountriesList(ignoreFlag).sort(sortFn);

  return list;
}
