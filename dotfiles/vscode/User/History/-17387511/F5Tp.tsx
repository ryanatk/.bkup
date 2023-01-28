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

const loadCheckoutScripts = (): void => {
  [
    {
      id: 'paypal-checkout-script',
      src: 'https://www.paypalobjects.com/api/checkout.js',
    },
    {
      id: 'zuora-checkout-script',
      src: 'https://static.zuora.com/Resources/libs/hosted/1.3.1/zuora-min.js',
    },
  ].map(({ id, src }) => {
    // check if the script already exists
    if (document.getElementById(id)) {
      return;
    }

    const script = document.createElement('script');

    script.async = true;
    script.id = id;
    script.src = src;

    document.head.appendChild(script);
  });
};

export default loadCheckoutScripts;
