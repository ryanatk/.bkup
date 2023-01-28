import Utils from '../utils/utils';

interface CountryListItem {
  label: string;
  value: string;
}

export function useSellToCountries(): CountryListItem[] {
  const list: CountryListItem[] = Utils.getSellToCountriesList().sort(function (
    a,
    b,
  ) {
    return a.label.localeCompare(b.label);
  });

  return list;
}
