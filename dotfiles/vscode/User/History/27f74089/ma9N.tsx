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

declare global {
  interface Window {
    paypal: {
      checkout: {
        initXO: () => void;
        closeFlow: () => void;
        startFlow: () => void;
      };
    };
  }
}

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
  console.log('<Paypal>', {
    country,
    selectedCurrency,
    paymentGateway,
    paypalMerchantId,
    checkoutCallback,
    authSuccessTransKey,
  });

  // useEffect(() => {
  if (window.paypal) {
    window.paypal = {
      ...window.paypal,
      checkout: {
        ...window.paypal.checkout,
        // startFlow: () => {
        //   console.log('%%% paypal.startFlow', window.paypal.checkout.startFlow);
        //   if (typeof window.paypal.checkout.startFlow === 'function') {
        //     window.paypal.checkout.startFlow();
        //   }
        // },
        closeFlow: () => {
          console.log('%%% paypal.closeFlow', window.paypal.checkout.closeFlow);
          if (typeof window.paypal.checkout.closeFlow === 'function') {
            window.paypal.checkout.closeFlow();
          }
        },
        // initXO: () => {
        // console.log('%%% paypal.initXO', window.paypal.checkout.initXO);
        //   if (typeof window.paypal.checkout.initXO === 'function') {
        //     window.paypal.checkout.initXO();
        //   }
        // },
      },
    };
  }
  // }, []);
  // paypal?.checkout?.closeFlow();
  // paypal?.checkout?.initXO();

  const router = useRouter();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(true);
  const [paypalLoadingError, setPaypalLoadingError] = useState(false);
  const { query } = router;

  useEffect(() => {
    console.log('!!! useEffect', {
      paymentGateway,
      paypalMerchantId,
      query,
      loading,
    });

    if (loading) {
      console.log('! setLoading false');
      setLoading(false);
    } else if (!paymentGateway || !paypalMerchantId) {
      console.log('! setPaypalLoadingError');

      setPaypalLoadingError(true);
    } else if (query.token && query.gateway) {
      console.log('! checkoutCallback');

      checkoutCallback({
        token: query.token,
        gateway: PG_PAYPAL,
      });
    } else {
      console.log('! window.paypalCheckoutReady', {
        paypalMerchantId,
        PAYPAL_ENV,
        // loading,
      });

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

  useEffect(() => {
    console.log({ window, top });

    if (window != top) {
      console.log('***************');
      const location = document.location.href;
      top.location.replace(location);
    }
  }, []);

  /**
   * Handle PayPal flow
   */
  const handlePaypalFlow = async () => {
    console.log('!!! handlePaypalFlow');

    paypal.checkout.initXO();

    const { href, search } = window.location;
    const path = href.replace(search, '');

    // TODO: remove
    paypal.checkout.startFlow(`${path}?gateway=${paymentGateway}`);
    return;

    const { status, response } = await setExpressCheckout({
      country: country,
      currency: selectedCurrency,
      returnUrl: `${path}?gateway=${paymentGateway}`,
      cancelUrl: `${path}?status=canceled`,
      callbackURL: path,
    });

    console.log({ status, response });

    if (status !== 200 || !response || !response.url) {
      console.log('! closeFlow', paypal.checkout.closeFlow);

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
      console.log('! startFlow');
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
