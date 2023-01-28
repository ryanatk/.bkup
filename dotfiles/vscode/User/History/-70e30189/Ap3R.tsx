import { Backdrop, CircularProgress } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { PG_AFFIRM, PG_BRAINTREE, PG_PAYPAL } from '../../../consts/payments';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import { getCartRingCount } from '../../../utils/cartCount';
import { Alert, Button, Checkbox, Typography } from '../../sormus';
import PaymentMethodSelection from '../../sormus/PaymentMethodSelection';
import TermsAgreement from '../shared/TermsAgreement';
import useCheckoutPayment, {
  CheckoutPaymentActions,
  CheckoutPaymentData,
  UseCheckoutPayment,
} from './hooks/useCheckoutPayment';
import { Affirm, Paypal, Zuora } from './paymentMethods';

interface CheckoutPaymentFormProps {
  onUnrecoverableError?: (error: any) => void;
  buttonLabelKey?: MessageKey;
  onSubmit?: () => void;
}

const CheckoutPaymentForm = ({
  buttonLabelKey = 'checkout_placeorder',
  onUnrecoverableError,
  onSubmit,
}: CheckoutPaymentFormProps): JSX.Element => {
  const { actions, data }: UseCheckoutPayment = useCheckoutPayment(
    onUnrecoverableError,
    onSubmit,
  );

  const {
    affirmActionCallback,
    handleAffirmCancel,
    handleCheckoutAgreementToggle,
    handleEmailSubscriptionToggle,
    handlePayment,
    handlePaymentMethodSelectionChange,
    handleSubmitOrder,
    handleZuoraCustomError,
    handleZuoraValidationError,
    setReloadPaymentForm,
    shouldLoadPaymentMethod,
  }: CheckoutPaymentActions = actions;

  const checkoutCallback = useCallback(
    (arg) => handlePayment(arg),
    [handlePayment],
  );

  const {
    address,
    alertText,
    canPlaceOrder,
    canShowAffirm,
    checkout,
    checkoutAgreement,
    orderProcessing,
    paymentGateways,
    paymentGatewaySelected,
    paymentGatewaysLoading,
    paymentProcessing,
    placeOrderSectionRef,
    reloadPaymentForm,
    selectedCurrency,
    shippingCountry,
    showPaypal,
    signUpSelected,
  }: CheckoutPaymentData = data;

  /**
   * This triggers a re-render of the payment forms after order failure occurs.
   * Ideally this should be done via some other mechanism than re-rendering
   * and should be refactored in the future when checkout state is moved to
   * the server.
   */
  useEffect(() => {
    if (reloadPaymentForm) {
      setReloadPaymentForm(false);
    }
  }, [reloadPaymentForm, setReloadPaymentForm]);

  // Return null if no payment gateways
  if (!paymentGateways || paymentGatewaysLoading) return null;

  return (
    <>
      <div className="pt-2 pl-4">
        {!checkout.order && checkout.totalPriceAfterTax === 0 && (
          <Alert className="my-2" text={alertText} severity="info" />
        )}
      </div>
      <div className="mt-4 mb-2" data-cy="payment-edit">
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

        {!reloadPaymentForm ? (
          <>
            {shouldLoadPaymentMethod(PG_BRAINTREE) && (
              <Zuora
                address={address}
                paymentGateway={paymentGateways[PG_BRAINTREE].paymentGateway}
                paymentPageId={paymentGateways[PG_BRAINTREE].zuoraPageId}
                onValidationError={handleZuoraValidationError}
                onCustomError={handleZuoraCustomError}
                on3dSecureTransaction={() => {}}
              />
            )}

            {shouldLoadPaymentMethod(PG_PAYPAL) && (
              <Paypal
                country={shippingCountry}
                selectedCurrency={selectedCurrency}
                paymentGateway={paymentGateways[PG_PAYPAL].paymentGateway}
                paypalMerchantId={paymentGateways[PG_PAYPAL].paypalMerchantId}
                checkoutCallback={checkoutCallback}
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
          </>
        ) : null}
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
            className="mt-4 w-80 h-16"
            aria-label="Submit Order"
          >
            {t(buttonLabelKey)}
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
    </>
  );
};

export default CheckoutPaymentForm;
