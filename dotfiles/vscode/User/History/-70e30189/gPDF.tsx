import { Backdrop, CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { Suspense, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { PG_AFFIRM, PG_BRAINTREE, PG_PAYPAL } from '../../../consts/payments';
import useCheckout from '../../../hooks/useCheckout';
import { usePaymentGateways } from '../../../hooks/usePaymentGateways';
import { t } from '../../../public/locales/LocaleContext';
import { getCheckoutSelector } from '../../../stores/checkout/selectors';
import { getCartRingCount } from '../../../utils/cartCount';
import { getCheckoutCurrency } from '../../../utils/getCheckoutCurrency';
import { Alert, Button, Checkbox, Typography } from '../../sormus';
import PaymentMethodSelection from '../../sormus/PaymentMethodSelection';
import TermsAgreement from '../_global/TermsAgreement';
import Affirm from './affirm';
import Paypal from './paypal';
import usePayment from './usePayment';
import Zuora from './zuora';

const CheckoutScripts = React.lazy(() => import('./CheckoutScripts'));

const allowedGateways = [PG_PAYPAL, PG_BRAINTREE, PG_AFFIRM];

interface CheckoutPaymentFormProps {
  onUnrecoverableError?: (error: any) => void;
  buttonLabelKey?: any;
  onSubmit?: () => void;
}

const CheckoutPaymentForm = ({
  buttonLabelKey = null,
  onUnrecoverableError,
  onSubmit,
}: CheckoutPaymentFormProps) => {
  const checkout = useSelector(getCheckoutSelector);
  const router = useRouter();
  const { paymentGateways, isLoading: paymentGatewaysLoading } =
    usePaymentGateways(getCheckoutCurrency(checkout));
  const { affirmAction, affirmActionCallback, alertText, canShowAffirm } =
    usePayment(checkout);
  const {
    shouldLoadPaymentMethod,
    showPaypal,
    address,
    shippingCountry,
    selectedCurrency,
    placeOrderSectionRef,
    orderProcessing,
    handleCheckoutAgreementToggle,
    handleEmailSubscriptionToggle,
    handlePayment,
    handlePaymentMethodSelectionChange,
    handleSubmitOrder,
    handleZuoraValidationError,
    checkoutAgreement,
    canPlaceOrder,
    paymentProcessing,
    paymentGatewaySelected,
    signUpSelected,
    handleAffirmCancel,
  } = useCheckout(
    paymentGateways,
    allowedGateways,
    onUnrecoverableError,
    affirmAction,
    onSubmit,
  );

  const orderSuccess = useRef<boolean>(false);

  /**
   * Watch checkout for successful order
   */
  useEffect(() => {
    if (
      checkout.order &&
      checkout.order.status &&
      checkout.order.status.success
    ) {
      orderSuccess.current = true;
      router.push('/checkout/summary');
    }
  }, [checkout]);
  // Return null if no payment gateways
  if (!paymentGateways || paymentGatewaysLoading) return null;

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutScripts />
      </Suspense>

      <div className="pt-2 pl-4">
        {!checkout.order && checkout.totalPriceAfterTax === 0 && (
          <Alert className="my-2" text={alertText} severity="info" />
        )}
      </div>
      <div className="mt-4 mb-2">
        {!checkout.isLoading && !paymentProcessing && (
          <PaymentMethodSelection
            showAffirm={
              paymentGateways[PG_AFFIRM]?.paymentGateway && canShowAffirm
                ? true
                : false
            }
            showBraintree={
              paymentGateways[PG_BRAINTREE]?.paymentGateway ? true : false
            }
            showPaypal={
              paymentGateways[PG_PAYPAL]?.paymentGateway && showPaypal
                ? true
                : false
            }
            onPaymentMethodSelectionChange={handlePaymentMethodSelectionChange}
            paymentGatewaySelected={paymentGatewaySelected}
          />
        )}

        {shouldLoadPaymentMethod(PG_BRAINTREE) && (
          <Zuora
            address={address}
            paymentGateway={paymentGateways[PG_BRAINTREE].paymentGateway}
            paymentPageId={paymentGateways[PG_BRAINTREE].zuoraPageId}
            onValidationError={handleZuoraValidationError}
            on3dSecureTransaction={() => {}}
          />
        )}

        {shouldLoadPaymentMethod(PG_PAYPAL) && (
          <Paypal
            country={shippingCountry}
            selectedCurrency={selectedCurrency}
            paymentGateway={paymentGateways[PG_PAYPAL].paymentGateway}
            paypalMerchantId={paymentGateways[PG_PAYPAL].paypalMerchantId}
            checkoutCallback={handlePayment}
          />
        )}
        {shouldLoadPaymentMethod(PG_AFFIRM) && (
          <Affirm
            checkout={checkout}
            submitActionCallback={affirmActionCallback}
            checkoutCallback={handlePayment}
            onCancel={handleAffirmCancel}
          />
        )}
      </div>

      {canPlaceOrder ? (
        <div ref={placeOrderSectionRef}>
          <TermsAgreement
            onChange={handleCheckoutAgreementToggle}
            checked={checkoutAgreement}
            name="checkout-agreement"
          />

          <Checkbox
            className="text-ouraDarkGrey"
            label={t('checkout_email_agreement')}
            checked={signUpSelected}
            onChange={handleEmailSubscriptionToggle}
            name="subscribe-agreement"
            data-cy="subscribe-agreement"
          />

          <Button
            disabled={!checkoutAgreement}
            loading={checkout.isLoading || paymentProcessing}
            data-cy="button-submit-payment"
            onClick={handleSubmitOrder}
            className="mt-4"
            aria-label="Submit Order"
          >
            {t(buttonLabelKey || 'checkout_placeorder')}
          </Button>
          {getCartRingCount(checkout.cart) >= 1 && (
            <Typography className="mt-6" color="helsinkiBlue-dark">
              {t('checkout_subscription_disclaimer')}
            </Typography>
          )}
        </div>
      ) : null}

      <Backdrop
        open={
          orderProcessing || (checkout.order?.id && checkout.isLoading)
            ? true
            : false
        }
        className="z-50 opacity-100 text-helsinkiBlue bg-white bg-opacity-100"
      >
        <div className="flex justify-center gap-4">
          <CircularProgress color="inherit" size={20} />
          <Typography>{t('checkout_processing_order')}</Typography>
        </div>
      </Backdrop>
    </div>
  );
};

export default CheckoutPaymentForm;
