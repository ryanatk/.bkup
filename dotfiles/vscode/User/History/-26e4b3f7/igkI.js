import Utils from '../utils';

describe('getCountriesList', () => {
  it('contains some specific example countries', () => {
    const countries = Utils.getCountriesList();
    const byCode = {};
    for (const entry of countries) byCode[entry.value] = entry;

    expect(byCode['AU']).toEqual({ label: 'Australia', value: 'AU' });
    expect(byCode['FR']).toEqual({ label: 'France', value: 'FR' });
    expect(byCode['US']).toEqual({ label: 'United States', value: 'US' });
    expect(byCode['RU']).toEqual({ label: 'Russian Federation', value: 'RU' });
    expect(countries.length).toBeGreaterThan(63);
    expect(countries.length).toBeLessThan(300);
  });
});

describe('getCountriesList with optional filter', () => {
  it('does not contain some specific example countries', () => {
    const countries = Utils.getCountriesList(({ sellTo }) => sellTo);
    const byCode = {};
    for (const entry of countries) byCode[entry.value] = entry;

    expect(byCode['AU']).toEqual({ label: 'Australia', value: 'AU' });
    expect(byCode['FR']).toEqual({ label: 'France', value: 'FR' });
    expect(byCode['US']).toEqual({ label: 'United States', value: 'US' });
    expect(countries.length).toBeGreaterThan(63);
    expect(countries.length).toBeLessThan(300);
  });
});

describe('getSellToCountriesList', () => {
  it('contains some specific example countries', () => {
    const sellToCountries = Utils.getSellToCountriesList();
    const byCode = {};
    for (const entry of sellToCountries) byCode[entry.value] = entry;

    expect(byCode['AU']).toEqual({ label: 'Australia', value: 'AU' });
    expect(byCode['FR']).toEqual({ label: 'France', value: 'FR' });
    expect(byCode['US']).toEqual({ label: 'United States', value: 'US' });
    expect(sellToCountries.length).toBeGreaterThan(43);
    expect(sellToCountries.length).toBeLessThan(300);
  });
});

describe('getSellToCountry', () => {
  it('returns correct results for specific countries', () => {
    expect(Utils.getSellToCountry(null)).toEqual(false);
    expect(Utils.getSellToCountry('')).toEqual(false);
    expect(Utils.getSellToCountry('US').name).toEqual('United States');
    expect(Utils.getSellToCountry('FI').name).toEqual('Finland');
    expect(Utils.getSellToCountry('US').eu).toEqual(false);
    expect(Utils.getSellToCountry('FI').eu).toEqual(true);
  });

  it('has required fields for every country', () => {
    const sellToCountries = Utils.getSellToCountriesList();
    for (const country of sellToCountries) {
      const countryInfo = Utils.getSellToCountry(country.value);
      expect(countryInfo.countryCode).toEqual(country.value);
      expect(countryInfo.currency).toBeDefined();
      expect(countryInfo.merchant).toBeDefined();
      expect(countryInfo.eu).toBeDefined();
    }
  });
});

describe('getCountryFullName', () => {
  it('returns correct results', () => {
    expect(Utils.getCountryFullName(null)).toEqual(false);
    expect(Utils.getCountryFullName('')).toEqual(false);
    expect(Utils.getCountryFullName('US')).toEqual('United States');
    expect(Utils.getCountryFullName('IN')).toEqual('India');
  });
});
