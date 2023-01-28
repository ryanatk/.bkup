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

const KEY = {
  tax_name: (value) => {
    switch (value?.toLowerCase()) {
      case 'tax':
        return 'cart_tax';
      case 'vat':
        return 'cart_vat';
      default:
        return value || 'cart_tax';
    }
  },
};

const translateParamKey = (
  params: { [x: string]: string },
  translateFn: (id: MessageKey) => ReactElement,
): string | ReactElement => {
  return Object.values(params).reduce((obj, [key, value]) => {
    const fn = KEY[key];

    return {
      ...obj,
      [key]: fn ? fn(value) : value,
    };
  }, {});
};

export default getTaxName;
