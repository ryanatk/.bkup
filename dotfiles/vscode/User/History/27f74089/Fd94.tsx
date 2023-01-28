/**
 * PayPal Docs: https://developer.paypal.com/docs/archive/express-checkout/in-context/enable-in-context-checkout/
 */

import { CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { PG_PAYPAL } from '../../../../consts/payments';
import { t } from '../../../../public/locales/LocaleContext';
import { setExpressCheckout } from '../../../../services/paypalService';
import logToDatadog from '../../../../utils/logToDatadog';
import { Alert, Typography } from '../../../sormus';

interface PayPalParams {
  country: string;
  selectedCurrency: string;
  paymentGateway: string;
  paypalMerchantId: string;
  checkoutCallback({}): void;
  authSuccessTransKey?: string;
}

declare let paypal: {
  checkout: any;
};

declare global {
  interface Window {
    paypalCheckoutReady(): void;
  }
}

const PAYPAL_ENV =
  process.env.OURA_ENV !== 'production' ? 'sandbox' : 'production';

const Paypal = ({
  country,
  selectedCurrency,
  paymentGateway,
  paypalMerchantId,
  checkoutCallback,
  authSuccessTransKey = 'checkout_paypal_auth_success',
}: PayPalParams): JSX.Element => {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(true);
  const [paypalLoadingError, setPaypalLoadingError] = useState(false);
  const { query } = router;

  useEffect(() => {
    if (loading) {
      setLoading(false);
    } else if (!paymentGateway || !paypalMerchantId) {
      setPaypalLoadingError(true);
    } else if (query.token && query.gateway) {
      checkoutCallback({
        token: query.token,
        gateway: PG_PAYPAL,
      });
    } else {
      window.paypalCheckoutReady = function () {
        paypal.checkout.setup(paypalMerchantId, {
          environment: PAYPAL_ENV,
          container: 'paypal-button',
          size: 'medium',
          color: 'blue',
          shape: 'pill',
          tagline: 'false',
        });
      };
    }
  }, [checkoutCallback, loading, paypalMerchantId, paymentGateway, query]);

  /**
   * Handle PayPal flow
   */
  const handlePaypalFlow = async () => {
    paypal.checkout.initXO();

    const { href, search } = window.location;
    const path = href.replace(search, '');
    const { status, response } = await setExpressCheckout({
      country: country,
      currency: selectedCurrency,
      returnUrl: `${path}?gateway=${paymentGateway}`,
      cancelUrl: `${path}?status=canceled`,
      callbackURL: path,
    });

    if (status !== 200 || !response || !response.url) {
      paypal.checkout.closeFlow();

      checkoutCallback({
        errorMessage: t('checkout_paypal_error'),
        rawErrorMessage: `Payment with Paypal failed with status: ${status}`,
        token: '',
      });

      logToDatadog(
        'checkout',
        `Payment with Paypal failed with status: ${status}.`,
        {
          status,
          response,
        },
      );

      setLoading(false);
    } else {
      paypal.checkout.startFlow(response.url);
    }
  };

  if (paypalLoadingError) {
    // TODO: add messagin specific to paypal
    return (
      <Alert severity="error" data-cy="paypal-auth-error-notice">
        {t('checkout_cant_load_paypal')}
      </Alert>
    );
  }

  return (
    <div className="mt-4 mb-2 pl-4">
      {loading ? (
        <CircularProgress size={20} />
      ) : (
        <>
          {query.token && query.gateway ? (
            <Alert severity="success" data-cy="paypal-auth-success-notice">
              {formatMessage({ id: authSuccessTransKey })}
            </Alert>
          ) : (
            <div className="flex flex-col gap-4 justify-center">
              <div className="mx-auto">
                <Typography color="inherit">
                  {formatMessage({ id: 'checkout_paypal_auth_notice' })}
                </Typography>
              </div>
              <div
                className="mx-auto"
                id="paypal-button"
                onClick={handlePaypalFlow}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Paypal;
