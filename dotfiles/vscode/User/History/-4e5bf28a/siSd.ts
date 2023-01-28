import Utils from '../utils/utils';

interface CountryListItem {
  label: string;
  value: string;
}

interface HookProps {
  ignoreFlag?: boolean;
}

export function useSellToCountries(ignoreFlag): CountryListItem[] {
  const sortFn = (a, b) => a.label.localeCompare(b.label);
  const list: CountryListItem[] = Utils.getSellToCountriesList().sort(sortFn);
  const filterFn = ignoreFlag ? () => true : ({ sellTo }) => sellTo;

  return list;
}
