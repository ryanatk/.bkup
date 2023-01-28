import translateValues from '../translateValues';

const mockTranslations = {
  translation_key: 'this is tax',
};

const translateFn = (key) => mockTranslations[key];

describe('', () => {
  it('Returns the same object when the key is not found', () => {
    const EXPECTED = 'random value';
    const { translated } = translateValues(
      { translated: EXPECTED },
      translateFn,
    );

    expect(translated).toBe(EXPECTED);
  });
});
