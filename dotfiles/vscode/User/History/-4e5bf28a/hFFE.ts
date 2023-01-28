import Utils from '../utils/utils';

interface CountryListItem {
  label: string;
  value: string;
}

interface HookProps {
  ignoreFlag?: boolean;
}

export function useSellToCountries(ignoreFlag): CountryListItem[] {
  const list: CountryListItem[] = Utils.getSellToCountriesList(ignoreFlag).sort(
    (a, b) => a.label.localeCompare(b.label),
  );

  return list;
}
