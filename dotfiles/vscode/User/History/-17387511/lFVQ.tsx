import { useEffect } from 'react';

const SCRIPTS = [
  {
    id: 'paypal-checkout-script',
    src: 'https://www.paypalobjects.com/api/checkout.js',
  },
  {
    id: 'zuora-checkout-script',
    src: 'https://static.zuora.com/Resources/libs/hosted/1.3.1/zuora-min.js',
  },
];

const CheckoutScripts = (): void => {
  useEffect(() => {
    return null;
  }, []);
};

export default CheckoutScripts;