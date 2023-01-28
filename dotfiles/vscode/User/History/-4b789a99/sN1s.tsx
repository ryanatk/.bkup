import { useIntl } from 'react-intl';
import { PG_AFFIRM, PG_BRAINTREE, PG_PAYPAL } from '../../../consts/payments';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { breakpoints } from '../constants';
import CreditCardIcons from '../CreditCardIcons';
import RadioButton from '../RadioButton';
import RadioGroup from '../RadioGroup';
import Typography from '../Typography';
import VectorImage from '../VectorImage';

const PaymentMethodSelection = ({
  onPaymentMethodSelectionChange,
  paymentGatewaySelected,
  showBraintree = true,
  showPaypal = true,
  showAffirm = false,
}) => {
  const isMinWidthMedium = useMediaQuery(`(min-width:${breakpoints.medium}px)`);
  const { formatMessage } = useIntl();

  return (
    <RadioGroup
      name="payment-method"
      label="Payment Method"
      value={paymentGatewaySelected}
      onChange={onPaymentMethodSelectionChange}
      formControlClasses="block"
    >
      <div className="flex justify-center items-start">
        {showBraintree && (
          <div className="w-1/3 md:1/4 text-center">
            <RadioButton
              value={PG_BRAINTREE}
              ariaLabel={formatMessage({ id: 'credit_card' })}
              data-cy="radio-checkout-payment-braintree"
              label={
                <CreditCardIcons
                  size={isMinWidthMedium ? 'default' : 'small'}
                  disabled={['discover', 'jcb']}
                />
              }
              className="text-helsinkiBlue mb-8"
              labelPlacement="bottom"
            />
          </div>
        )}
        {showPaypal && (
          <div className="w-1/3 md:1/4 text-center">
            <RadioButton
              value={PG_PAYPAL}
              ariaLabel={formatMessage({ id: 'paypal' })}
              data-cy="radio-checkout-payment-paypal"
              label={
                <VectorImage
                  name="paypal"
                  width={isMinWidthMedium ? 100 : 60}
                />
              }
              className="text-helsinkiBlue mb-8"
              labelPlacement="bottom"
            />
          </div>
        )}
        {showAffirm && (
          <div className="w-1/3 md:1/4 text-center">
            <RadioButton
              value={PG_AFFIRM}
              ariaLabel={formatMessage({ id: 'affirm' })}
              data-cy="radio-checkout-payment-affirm"
              label={
                <div className="flex flex-col">
                  <div className="mx-auto">
                    <VectorImage name="affirm" width={50} />
                  </div>
                  <div className="mt-1 text-center">
                    <Typography color="black" variant="eyebrow">
                      Monthly payments
                    </Typography>
                  </div>
                </div>
              }
              className="text-helsinkiBlue mb-8"
              labelPlacement="bottom"
            />
          </div>
        )}
      </div>
    </RadioGroup>
  );
};

export default PaymentMethodSelection;
