import { ReactElement } from 'react';
import { MessageKey } from '../public/locales/setup';

/**
 * Takes a "values" object
 * that can be used with `t()` or <FormattedMessage />,
 * and checks the configuration for a corresponding "masking" function.
 *
 * It then returns an object with the same structure,
 * but with updated (and translated) values.
 *
 * Also note that you must pass in `t`, because `t` is a hook,
 * so it cannot be imported into a util function.
 */

const setupConfig = (translateFn: (id: MessageKey) => ReactElement) => ({
  tax_name: (value: string) => {
    switch (value?.toLowerCase()) {
      case 'tax':
        return translateFn('cart_tax');
      case 'vat':
        return translateFn('cart_vat');
      default:
        return value || translateFn('cart_tax');
    }
  },
});

const translateValues = (
  valuesObject: { [x: string]: string },
  translateFn: (id: MessageKey) => ReactElement, // pass in `t`, because it's a hook and cannot be imported into a util function
): { [x: string]: string | ReactElement } => {
  const CONFIG = setupConfig(translateFn);

  return Object.entries(valuesObject).reduce((obj, [key, value]) => {
    const fn = CONFIG[key];

    return {
      ...obj,
      [key]: fn ? fn(value, translateFn) : value,
    };
  }, {});
};

export default translateValues;
