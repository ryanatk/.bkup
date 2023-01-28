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

const useCheckoutScripts = (): void => {
  useEffect(() => {
    SCRIPTS.map(({ id, src }) => {
      const exists = document.getElementById(id);

      if (exists) {
        return;
      }

      const script = document.createElement('script');

      script.async = true;
      script.id = id;
      script.src = src;

      document.head.appendChild(script);
    });
  }, []);
};

export default useCheckoutScripts;
