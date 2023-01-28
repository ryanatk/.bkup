import translateValues from '../translateValues';

const mockTranslations = {
  cart_tax: 'this is tax',
  cart_vat: 'this is vat',
};

const translateFn = (key) => mockTranslations[key];

describe('', () => {
  it('Returns the same object when the key is not found', () => {
    const valuesObject = {
      random_key: 'random value',
    };

    const translated = translateValues(valuesObject, translateFn);
  });
});
