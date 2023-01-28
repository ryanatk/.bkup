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

const addScript = (id, src) => {
  const script = document.createElement('script');

  script.async = true;
  script.id = id;
  script.src = src;

  document.head.appendChild(script);
};

const loadCheckoutScripts = (): void => {
  console.log('!!!!!!!!!!!!!!!!!!!!');
  SCRIPTS.map(({ id, src }) =>
    // only add script once
    document.getElementById(id) ? null : addScript(id, src),
  );
};

export default loadCheckoutScripts;
