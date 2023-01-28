import { ReactElement } from 'react';
import { MessageKey } from '../public/locales/setup';

// Helper fn to provide translation based on value found in store
const getTaxName = (
  taxName: string,
  translateFn: (id: MessageKey) => ReactElement,
): string | ReactElement => {
  switch (taxName?.toLowerCase()) {
    case 'tax':
      return translateFn('cart_tax');
    case 'vat':
      return translateFn('cart_vat');
    default:
      return taxName || translateFn('cart_tax');
  }
};

export default getTaxName;
