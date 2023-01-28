import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FormattedMessage, useIntl } from 'react-intl';
import tw from 'twin.macro';
import * as Yup from 'yup';
import { EventType, sendSegmentTrack } from '../../../analytics';
import useCurrency from '../../../helpers/useCurrency';
import { t } from '../../../public/locales/LocaleContext';
import { CheckoutShippingRate } from '../../../types/CheckoutState';
import logToDatadog from '../../../utils/logToDatadog';
import Utils from '../../../utils/utils';
import { Alert, Button, RadioButton, Typography } from '../../sormus';
import { useCheckoutContext } from './contexts/CheckoutProvider';
import { StyledRadio } from './styles';
import { CheckoutContext } from './types';

const ShippingMethodContainer = tw.div`
  border-sand-dark
  border
  rounded-lg
  px-4
  py-2
  cursor-pointer
  flex
  flex-row
  items-center
  justify-between
`;

const Description = tw.p`
  text-grayscale2
  text-sm
`;

const validationSchema = Yup.object().shape({
  selectedMethod: Yup.string(),
});

const ShippingMethodRadioSrLabel = ({
  shippingRate,
}: {
  shippingRate: CheckoutShippingRate;
}): JSX.Element => {
  const { formatMessage } = useIntl();
  const { formatPrice } = useCurrency();
  return (
    <span className="sr-only">
      <span>
        {formatMessage({
          id: shippingRate.description_i18n_key,
        })}{' '}
        {t('shipping_method_shipping')}
      </span>
      <span>
        {shippingRate?.price > 0
          ? formatPrice(shippingRate.price)
          : formatMessage({ id: 'cart_free' })}
      </span>
    </span>
  );
};

export const ShippingMethodEditView = (): JSX.Element => {
  const {
    checkout,
    loading,
    onShippingMethodSubmit,
    onOpenShippingInfoModal,
  }: CheckoutContext = useCheckoutContext();
  const { formatMessage } = useIntl();
  const { formatPrice } = useCurrency();
  const { asPath } = useRouter();

  const methods: CheckoutShippingRate[] = checkout?.shippingRatesAvailable;

  // Default to previously selected option or null
  const selectedMethod = null;

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
    initialValues: {
      selectedMethod,
    },
    onSubmit: async (values) => {
      const normalizedValues = Utils.normalizeObjectToNFD(values);
      const shippingRate = methods.find(
        (method: CheckoutShippingRate) =>
          method?.sku === normalizedValues.selectedMethod,
      );

      try {
        onShippingMethodSubmit(shippingRate);
      } catch (error) {
        logToDatadog('checkout', 'Error selecting shipping method', {
          error,
        });
      }
    },
  });

  const handleMethodClick = (method) => {
    sendSegmentTrack({
      type: EventType.ModuleClicked,
      payload: {
        cta: method,
        location: 'radio button',
        path: asPath,
      },
    });
  };

  if (!methods)
    return (
      <Alert severity="error" className="mt-4">
        {t('checkout_no_shipping_methods')}
      </Alert>
    );

  return (
    <>
      <div className="-mt-4">
        <Description className="mb-4">
          {t('shipping_method_description')}{' '}
        </Description>
        <div className="mb-4">
          <Button
            variant="body-link"
            className="text-helsinkiBlue-light text-sm"
            onClick={onOpenShippingInfoModal}
          >
            {t('shipping_learn_more')}
          </Button>
        </div>
      </div>
      <form
        data-cy="shipping-method-edit"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <div className="grid gap-x-4">
          <div className="col-span-12">
            <StyledRadio
              value={formik.values.selectedMethod}
              name="gift_options"
              onChange={formik.handleChange}
              label={formatMessage({ id: 'choose_your_shipping_method' })}
              formControlClasses="w-full"
              className="flex-col xl:flex-row gap-4"
            >
              {methods.map(
                ({
                  description_i18n_key,
                  sku,
                  price,
                }: CheckoutShippingRate) => (
                  <ShippingMethodContainer
                    key={`shipping-method-${sku}`}
                    className="flex-1"
                  >
                    <div className="flex items-center">
                      <RadioButton
                        name="selectedMethod"
                        value={sku}
                        key={sku}
                        data-cy={`checkout-shipping-method-${sku}`}
                        onClick={handleMethodClick}
                        className="fuck"
                        label={
                          <ShippingMethodRadioSrLabel
                            shippingRate={{ description_i18n_key, price, sku }}
                          />
                        }
                      />
                      <Typography aria-hidden="true" className="-ml-4">
                        {`${formatMessage({ id: description_i18n_key })}`}
                      </Typography>
                    </div>
                    <Typography aria-hidden="true">{` ${
                      price > 0
                        ? formatPrice(price)
                        : formatMessage({ id: 'cart_free' })
                    }`}</Typography>
                  </ShippingMethodContainer>
                ),
              )}
            </StyledRadio>
          </div>
          <div className="col-span-12 flex">
            <Button
              type="submit"
              data-cy="checkout-shipping-method-next-button"
              className="mt-10 ml-auto"
              loading={loading}
              loadingTextEnabled
            >
              <FormattedMessage
                id="next_billing"
                values={{
                  b(chunks) {
                    return <b>{chunks}</b>;
                  },
                }}
              />
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export const ShippingMethodCompleteView = (): JSX.Element => {
  const {
    checkout: { shippingRate },
    onStepChange,
    onOpenShippingInfoModal,
  } = useCheckoutContext();
  const { formatMessage } = useIntl();
  const { formatPrice } = useCurrency();

  const handleClick = () => {
    onStepChange(3);
  };

  if (!shippingRate || !shippingRate.description_i18n_key) return null;

  return (
    <>
      <Description className="-mt-4 mb-4">
        <Button
          variant="body-link"
          className="text-helsinkiBlue-light text-sm"
          onClick={onOpenShippingInfoModal}
        >
          {t('delivery_estimates')}
        </Button>
      </Description>
      <ShippingMethodContainer
        data-cy="shipping-method-complete"
        onClick={(e) => {
          console.log(e);
          handleClick();
        }}
      >
        <>
          <div className="flex items-center">
            <RadioButton
              className="shit"
              value={shippingRate.sku}
              label={<ShippingMethodRadioSrLabel shippingRate={shippingRate} />}
              checked
            />
            <Typography aria-hidden="true" className="-ml-4">
              {formatMessage({
                id: shippingRate.description_i18n_key,
              })}{' '}
              {t('shipping_method_shipping')}
            </Typography>
          </div>
          <Typography aria-hidden="true">
            {shippingRate?.price > 0
              ? formatPrice(shippingRate.price)
              : formatMessage({ id: 'cart_free' })}
          </Typography>
        </>
      </ShippingMethodContainer>
    </>
  );
};
