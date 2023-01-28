import { Backdrop, CircularProgress } from '@material-ui/core';
import { PG_BRAINTREE, PG_PAYPAL } from '../../../consts/payments';
import useCheckoutPayment, {
  CheckoutPaymentActions,
  CheckoutPaymentData,
  UseCheckoutPayment,
} from '../../../hooks/useCheckoutPayment';
import { t } from '../../../public/locales/LocaleContext';
import { Button, Checkbox, Typography } from '../../sormus';
import PaymentMethodSelection from '../../sormus/PaymentMethodSelection';
import TermsAgreement from '../_global/TermsAgreement';
import Paypal from './paypal';
import Zuora from './zuora';

interface CheckoutMembershipPaymentFormProps {
  affirmOneShot: boolean | undefined;
  onUnrecoverableError?: (error: any) => void;
}

const CheckoutMembershipPaymentForm = ({
  affirmOneShot,
  onUnrecoverableError,
}: CheckoutMembershipPaymentFormProps): JSX.Element => {
  const { actions, data }: UseCheckoutPayment = useCheckoutPayment(
    affirmOneShot,
    onUnrecoverableError,
  );

  const {
    handleCheckoutAgreementToggle,
    handleEmailSubscriptionToggle,
    handlePayment,
    handlePaymentMethodSelectionChange,
    handleSubmitOrder,
    handleZuoraValidationError,
    shouldLoadPaymentMethod,
  }: CheckoutPaymentActions = actions;

  const {
    address,
    canPlaceOrder,
    checkout,
    checkoutAgreement,
    orderProcessing,
    paymentGateways,
    paymentGatewaySelected,
    paymentGatewaysLoading,
    paymentProcessing,
    placeOrderSectionRef,
    selectedCurrency,
    shippingCountry,
    showPaypal,
    signUpSelected,
  }: CheckoutPaymentData = data;

  // Return null if no payment gateways
  if (!paymentGateways || paymentGatewaysLoading) return null;

  return (
    <div>
      <div className="mt-4 mb-2">
        <Typography>
          Additional payment method required for monthly subscription. Your
          6-month free trial begins once you receive and activate your ring, and
          you will not be charged until after the free trial ends.
        </Typography>
        {!checkout.isLoading && !paymentProcessing && (
          <PaymentMethodSelection
            showAffirm={false}
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
            data-cy="button-submit-payment-subscription"
            onClick={handleSubmitOrder}
            className="mt-4"
            aria-label="Submit Order"
          >
            {t('checkout_placeorder')}
          </Button>

          <Typography className="mt-6" color="helsinkiBlue-dark">
            {t('checkout_subscription_disclaimer')}
          </Typography>
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

export default CheckoutMembershipPaymentForm;
