import { ReactElement } from 'react';
import { MessageKey } from '../public/locales/setup';

// Helper fn to provide translation based on value found in store
const getTaxName = (
  params: { tax_name: string },
  translateFn: (id: MessageKey) => ReactElement,
): string | ReactElement => {
  switch (params.tax_name?.toLowerCase()) {
    case 'tax':
      return 'cart_tax';
    case 'vat':
      return 'cart_vat';
    default:
      return params.tax_name || 'cart_tax';
  }
};

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
  translateFn: (id: MessageKey) => ReactElement, // have to pass in `t`, because it's a hook
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

export default getTaxName;
