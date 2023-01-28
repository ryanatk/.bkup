import translateValues from '../translateValues';

const mockTranslations = {
  translation_key: 'this is tax',
};

const translateFn = (key) => mockTranslations[key] ?? key;

describe('', () => {
  it('Returns object with key when the key is not found', () => {
    const UNMATCHED_KEY = 'unmatched_key';
    const VALUE = 'random value';
    const obj = translateValues({ [UNMATCHED_KEY]: VALUE }, translateFn);

    expect(obj[UNMATCHED_KEY]).toBe(VALUE);
  });

  it('Returns object with key when the key is found, and the value is not a match', () => {
    const MATCHING_KEY = 'tax_name';
    const VALUE = 'unmatched value';
    const obj = translateValues({ [MATCHING_KEY]: VALUE }, translateFn);

    expect(obj[MATCHING_KEY]).toBe(VALUE);
  });
});
