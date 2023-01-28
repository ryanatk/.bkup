import { paypal, zuora } from '../../../consts/scripts';

const addScript = (id, src) => {
  const script = document.createElement('script');

  script.async = true;
  script.id = id;
  script.src = src;

  document.head.appendChild(script);
};

const loadCheckoutScripts = (): void => {
  [paypal, zuora].map(({ id, src }) =>
    // only add script once
    document.getElementById(id) ? null : addScript(id, src),
  );
};

export default loadCheckoutScripts;
