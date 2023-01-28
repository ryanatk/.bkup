import serviceAPI from '../utils/backendAPI';

interface setExpressCheckoutParams {
  country: string;
  currency: string;
  returnUrl: string;
  cancelUrl: string;
  callbackURL?: string;
}

async function setExpressCheckout({
  country,
  currency,
  returnUrl,
  cancelUrl,
  callbackURL,
}: setExpressCheckoutParams): Promise<any> {
  return await serviceAPI.post(
    '/v1/api/public/paypal/setExpressCheckout',
    {
      country,
      currency,
      returnUrl,
      cancelUrl,
      callbackURL,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
}

export { setExpressCheckout };
