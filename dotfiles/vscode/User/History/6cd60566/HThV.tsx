import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { PG_AFFIRM } from '../../../consts/payments';
import { buildAffirmPayload } from '../../../helpers/affirmPayload';
import { SAME_SHIPPING_BILLING_ADDRESS } from '../../../pages/checkout';
import { t } from '../../../public/locales/LocaleContext';
import CheckoutState from '../../../types/CheckoutState';
import { getCartRingCount } from '../../../utils/cartCount';
import cartIncludesRing from '../../../utils/cartIncludesRing';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';
import logToDatadog from '../../../utils/logToDatadog';
import { Alert, Button, Typography } from '../../sormus';

const AFFIRM_REASON_CANCELED = 'canceled';

interface AffirmErrorResponse {
  reason?: string;
  checkout_token?: string;
}

interface AffirmSuccessResponse {
  checkout_token: string;
}

interface AffirmParams {
  checkout: CheckoutState;
  submitActionCallback({}): void;
  checkoutCallback({}): void;
  onCancel?: () => void;
}

declare let affirm: any;

const Affirm = ({
  checkout,
  submitActionCallback,
  checkoutCallback,
  onCancel,
}: AffirmParams) => {
  const [loading, setLoading] = useState(true);
  const { formatMessage } = useIntl();
  const affirmOneShot = checkFeatureFlag('affirm-subscription');
  const oneMonthEnabled = checkFeatureFlag('one-month-free-membership');

  const AffirmMessage = () => {
    if (
      affirmOneShot &&
      cartIncludesRing(checkout.cart) &&
      getCartRingCount(checkout.cart) === 1
    ) {
      return (
        <div className="lg:pl-4" data-cy="affirm-oneshot-content">
          <div className="border border-sand-dark rounded-md p-4 my-2 text-center">
            <Typography color="burntOrange">
              {t('checkout_affirm_title')}
            </Typography>
            <Typography>{t('affirm_you_will_be_redirected')}</Typography>
            <div className="mt-4" />
            <Typography>
              {oneMonthEnabled
                ? t('affirm_subscription_payment_details_onemonth')}
                : t('affirm_subscription_payment_details')
            </Typography>
          </div>
          <Button
            type="button"
            data-cy="continue-to-affirm"
            className="mt-4"
            onClick={openAffirm}
          >
            Next
          </Button>
        </div>
      );
    } else if (getCartRingCount(checkout.cart) < 1) {
      return null;
    } else
      return (
        <Alert data-cy="affirm-content" severity="info">
          {t('checkout_affirm_content')}
        </Alert>
      );
  };
  /**
   * Handle Affirm modal opening
   */
  const openAffirm = () => {
    const cartLineItems = checkout.cart.lineItems;
    const affirmPayload = buildAffirmPayload({
      checkout,
      cartLineItems,
      billingAddressSameAsShipping:
        checkout.billingAddress === SAME_SHIPPING_BILLING_ADDRESS,
    });

    affirm.checkout(affirmPayload);

    affirm.checkout.open({
      onFail: function (error: AffirmErrorResponse) {
        if (error.reason && error.reason === AFFIRM_REASON_CANCELED) {
          if (onCancel) onCancel();
        } else {
          checkoutCallback({
            errorMessage: formatMessage({ id: 'checkout_affirm_failed' }),
            token: '',
          });

          logToDatadog('checkout', `Error with Affirm modal: ${error.reason}`);
        }
      },
      onSuccess: function (response: AffirmSuccessResponse) {
        const affirmToken = response.checkout_token;
        checkoutCallback({
          token: affirmToken,
          gateway: PG_AFFIRM,
        });
      },
    });
  };

  useEffect(() => {
    setLoading(true);

    affirm.ui.ready(() => {
      setLoading(false);
      submitActionCallback({ openAffirm });
    });
  }, []);

  return (
    <div className="pt-2 flex gap-2" data-cy="checkout-affirm-payment">
      {loading ? (
        <Typography color="inherit">{t('checkout_affirm_loading')}</Typography>
      ) : (
        <AffirmMessage />
      )}
    </div>
  );
};

export default Affirm;
