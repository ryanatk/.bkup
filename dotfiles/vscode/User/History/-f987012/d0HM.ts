import { ReactElement } from 'react';
import { MessageKey } from '../public/locales/setup';

/**
 * The `translateValues` function takes a "values" object,
 * and checks the config for a corresponding "masking" function.
 *
 * It then returns an object with the same structure,
 * but with updated (and translated) values.
 *
 * The "values" object is the same as:
 * - the `values` prop of the <FormattedMessage /> component
 * - the 2nd argument of the `t()` helper function
 *
 * Also note that you must pass in `t`, because `t` is a hook,
 * so it cannot be imported into a util function.
 *
 * Additional keys can be added to the config,
 * with additional values to be masked.
 */

// helper fn to separate the config & let us pass in the translateFn once
const setupConfig = (translateFn: (id: MessageKey) => ReactElement) => {
  // return the CONFIG
  return {
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
  };
};

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
