import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import {
  CheckoutStep,
  EventType,
  sendGTMWithSegmentEvent,
} from '../../../analytics';
import { checkoutPageDetails } from '../../../data-mock/page-details/checkout';
import { getBilboDiscountData } from '../../../helpers/bilboHelper';
import useCurrency from '../../../helpers/useCurrency';
import { t } from '../../../public/locales/LocaleContext';
import { getSellToCountriesList } from '../../../queries/Countries';
import { NETSUITE_SHIPPING_METHODS } from '../../../services/server/calculateService';
import {
  reqAnalyticsEvent,
  reqSegmentEvent,
} from '../../../stores/app/actions';
import { getCartSelector } from '../../../stores/cart/selectors';
import {
  reqRetryCheckoutAction,
  reqUpdateCheckoutAccountEmailAction,
  reqUpdateCheckoutBillingAddressAction,
  reqUpdateCheckoutShippingAddressAction,
  reqUpdateCheckoutShippingMethodAction,
} from '../../../stores/checkout/actions';
import { getCheckoutSelector } from '../../../stores/checkout/selectors';
import CheckoutState, {
  CheckoutAddress,
  CheckoutShippingRate,
} from '../../../types/CheckoutState';
import cartIncludesRing from '../../../utils/cartIncludesRing';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';
import getCohort, {
  REPLACEMENT,
  UPGRADER,
  UPGRADER_MEMBERSHIP,
  UPGRADER_NOMEMBERSHIP,
} from '../../../utils/getBilboCohort';
import initFraudDataCollection from '../../../utils/initFraudDataCollection';
import {
  getMetricReporter,
  reportBadExperience,
} from '../../../utils/reportMetrics';
import {
  Alert,
  Button,
  Checkbox,
  CollapsableContent,
  Grid,
  PageContainer,
  PageLayout,
  Typography,
} from '../../sormus';
import CheckoutOrderTable from '../../sormus/CheckoutOrderTable';
import CheckoutAccountEmail from './CheckoutAccountEmail';
import CheckoutAddressBlock from './CheckoutAddressBlock';
import CheckoutBillingForm from './CheckoutBillingForm';
import CheckoutPaymentForm from './CheckoutPaymentForm';
import CheckoutShippingForm from './CheckoutShippingForm';
import CheckoutShippingMethodForm from './CheckoutShippingMethodForm';
import CheckoutSteps from './CheckoutSteps';
import pageStyles from './index.module.scss';
import loadCheckoutScripts from './loadCheckoutScripts';

const metricReporter = getMetricReporter();
export const SAME_SHIPPING_BILLING_ADDRESS = 'same';

export const Checkout = () => {
  const { asPath, query } = useRouter();
  const dispatch = useDispatch();
  const checkout: CheckoutState =
    useSelector(getCheckoutSelector) || ({} as any);
  const cart = useSelector(getCartSelector);
  const { formatPrice } = useCurrency();
  const { formatMessage } = useIntl();
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [unrecoverableError, setUnrecoverableError] = useState(false);
  const [isGift, setIsGift] = useState(checkout.isGift || false);
  const [userCohort, setUserCohort] = useState(null);
  const discount = getBilboDiscountData();
  const [currentStep, setCurrentStep] = useState(0);
  const expeditedShippingEnabled = checkFeatureFlag('expedited-shipping');
  const isFreeShippingEnabled = checkFeatureFlag('free-shipping-messaging');
  const allowFraudDataCollection = checkFeatureFlag('kount-integration-ddc');
  const PAYMENT_METHOD_STEP = expeditedShippingEnabled ? 4 : 3;

  const { campaign } = discount;

  const teaserPrice = checkout.totalPriceAfterTax
    ? checkout.totalPriceAfterTax
    : cart.totalPriceAfterDiscount;

  const { data: countryData, isLoading: isLoading } =
    getSellToCountriesList(false);

  useEffect(() => {
    if (allowFraudDataCollection) {
      initFraudDataCollection(checkout.checkoutSessionId);
    }
  }, [allowFraudDataCollection, checkout.checkoutSessionId]);

  useEffect(() => {
    loadCheckoutScripts();
    // don't clean up, so we only load scripts once
  }, []);

  /**
   * Memoize account email edit view
   * Prevents uneccesary re-renders when checkout state changes
   */
  const accountEmailEditView = useCallback(
    ({ handleContinue, setLoading }) => (
      <CheckoutAccountEmail
        prefillEmail={discount?.autofillEmail}
        initialValues={{
          email: checkout.email,
          emailConfirm: checkout.email,
        }}
        isGift={isGift}
        onSubmit={(email: string) => {
          metricReporter.increment('ecom.web.checkout.step', {
            step: 'email_submit',
          });

          setLoading(true);
          dispatch(
            reqUpdateCheckoutAccountEmailAction(
              {
                email,
                isGift: isGift,
                prefillEmail: discount?.autofillEmail,
                cartIncludesRing: cartIncludesRing(cart),
              },
              (updatedCheckout: CheckoutState) => {
                if (updatedCheckout.error) {
                  setLoading(false);
                } else {
                  setLoading(false);
                  handleContinue();
                  metricReporter.increment('ecom.web.checkout.step', {
                    step: 'email_submit_success',
                  });
                }
              },
            ),
          );
        }}
      />
    ),
    [checkout.email, checkout.error, isGift, discount],
  );
  /**
   * Memoize payment edit view
   * Prevents uneccesary re-renders when checkout state changes
   */
  const paymentEditView = useCallback(
    ({ handleContinue, setLoading }) => (
      <CheckoutPaymentForm
        onUnrecoverableError={() => setUnrecoverableError(true)}
        onSubmit={() => {
          setLoading(true);
          if (checkout.affirmPaymentToken) {
            handleContinue();
            setLoading(false);
          } else setLoading(false);
        }}
      />
    ),
    [
      checkout.error,
      checkout.affirmPaymentToken,
      checkout.paymentToken,
      checkout.gateway,
    ],
  );

  const paymentCompleteView = () => {
    return null;
  };

  /**
   * Memoize shipping address edit view
   * Prevents uneccesary re-renders when checkout state changes
   */
  const shippingAddressEditView = useCallback(
    ({ handleContinue, setLoading }) => (
      <CheckoutShippingForm
        initialValues={checkout.shippingAddress}
        loading={checkout.isLoading || isLoading}
        countryData={countryData}
        onSubmit={(shippingAddress: CheckoutAddress) => {
          setLoading(true);

          const shippingRate = isFreeShippingEnabled
            ? { ...NETSUITE_SHIPPING_METHODS.STANDARD, price: 0 }
            : !expeditedShippingEnabled
            ? checkout.shippingRateDiscounted ||
              NETSUITE_SHIPPING_METHODS.STANDARD
            : undefined;

          dispatch(
            reqUpdateCheckoutShippingAddressAction(
              {
                currentStep: 0,
                shippingRate,
                shippingAddress: {
                  ...shippingAddress,
                  email: checkout.email,
                },
              },
              (updatedCheckout: CheckoutState) => {
                if (updatedCheckout.error) {
                  setLoading(false);
                } else {
                  setLoading(false);
                  handleContinue();
                }
              },
            ),
          );
        }}
        isGift={isGift}
      />
    ),
    [
      checkout.shippingAddress,
      checkout.error,
      checkout.email,
      checkout.isLoading,
      isGift,
    ],
  );

  /**
   * Memoize shipping method edit view
   * Prevents uneccesary re-renders when checkout state changes
   */
  const shippingMethodEditView = useCallback(
    ({ handleContinue, setLoading }) => (
      <>
        <CheckoutShippingMethodForm
          onSubmit={(selectedMethod: CheckoutShippingRate) => {
            setLoading(true);

            dispatch(
              reqUpdateCheckoutShippingMethodAction(
                {
                  currentStep: 0,
                  shippingRate: selectedMethod,
                },
                (updatedCheckout: CheckoutState) => {
                  if (updatedCheckout.error) {
                    setLoading(false);
                  } else {
                    setLoading(false);
                    handleContinue();
                  }
                },
              ),
            );
          }}
          preselectedMethodId={
            checkout.shippingRate && checkout.shippingRate.id
          }
          methods={checkout.shippingRatesAvailable}
        />
      </>
    ),
    [checkout.shippingRatesAvailable, checkout.shippingRate, checkout.error],
  );

  /**
   * Memoize billing address edit view
   * Prevents uneccesary re-renders when checkout state changes
   */
  const billingAddressEditView = useCallback(
    ({ handleContinue, setLoading }) => (
      <>
        <Checkbox
          className="pl-4 text-helsinkiBlue-dark mb-4"
          label={t('checkout_billingshippingsame')}
          checked={sameAsShipping}
          onChange={() =>
            setSameAsShipping((sameAsShipping) => !sameAsShipping)
          }
          name="billing-address-same"
        />
        {!sameAsShipping ? (
          <div className="-mt-4">
            <CheckoutBillingForm
              isGift={isGift}
              initialValues={
                checkout.billingAddress === SAME_SHIPPING_BILLING_ADDRESS
                  ? {}
                  : checkout.billingAddress
              }
              countryData={countryData}
              loading={checkout.isLoading || isLoading}
              onSubmit={(billingAddress: CheckoutAddress) => {
                setLoading(true);
                dispatch(
                  reqAnalyticsEvent({
                    type: EventType.CheckoutNewStepCompleted,
                    payload: {
                      step: CheckoutStep.BillingAddress,
                      billing_address: billingAddress,
                    },
                  }),
                );
                dispatch(
                  reqUpdateCheckoutBillingAddressAction(
                    {
                      currentStep: 0,
                      billingAddress,
                    },
                    (updatedCheckout: CheckoutState) => {
                      if (updatedCheckout.error) {
                        setLoading(false);
                      } else {
                        setLoading(false);
                        handleContinue();
                      }
                    },
                  ),
                );
              }}
            />
          </div>
        ) : (
          <Button
            type="button"
            data-cy="button-submit-same-billing-address"
            loading={checkout.isLoading}
            onClick={() => {
              setLoading(true);
              dispatch(
                reqAnalyticsEvent({
                  type: EventType.CheckoutNewStepCompleted,
                  payload: {
                    step: CheckoutStep.BillingAddress,
                    billing_address: SAME_SHIPPING_BILLING_ADDRESS,
                  },
                }),
              );
              dispatch(
                reqUpdateCheckoutBillingAddressAction(
                  {
                    currentStep: 0,
                    billingAddress: SAME_SHIPPING_BILLING_ADDRESS,
                  },
                  (updatedCheckout: CheckoutState) => {
                    if (updatedCheckout.error) {
                      setLoading(false);
                    } else {
                      setLoading(false);
                      handleContinue();
                    }
                  },
                ),
              );
            }}
          >
            {t('next')}
          </Button>
        )}
      </>
    ),
    [
      checkout.billingAddress,
      checkout.error,
      checkout.isLoading,
      sameAsShipping,
      isGift,
    ],
  );

  /**
   * Set current checkout step to payment method on PayPal auth callback, and scroll to payment section
   */
  useEffect(() => {
    if (query.gateway && query.token) {
      setCurrentStep(PAYMENT_METHOD_STEP);

      const el = document.getElementById(
        `checkout-steps-step-${PAYMENT_METHOD_STEP}`,
      );

      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }, [query]);

  useEffect(() => {
    setUserCohort(getCohort(campaign));
  }, [campaign]);

  useEffect(() => {
    // uncheck 'same address' when is gift is selected
    if (isGift) setSameAsShipping(false);
  }, [isGift]);

  /**
   * Fire segment event for checkout viewed
   */
  useEffect(() => {
    if (checkout.initiated) return;

    dispatch(
      reqSegmentEvent({
        type: EventType.CheckoutStepViewed,
        payload: { payment_method: null, step: 1 },
      }),
    );
  }, [dispatch, checkout]);

  const handleToggleGift = () => {
    sendGTMWithSegmentEvent({
      type: !isGift ? EventType.GiftBoxChecked : EventType.GiftBoxUnchecked,
      payload: {
        path: asPath,
      },
    });

    setIsGift((isGift: boolean) => !isGift);
  };

  const handleRetryCheckout = () => {
    reportBadExperience('manual_retry_checkout');
    dispatch(reqRetryCheckoutAction());
    setCurrentStep(0);
    setUnrecoverableError(false);
  };

  const handleStepChange = (step: number) => setCurrentStep(step);

  return (
    <PageLayout
      headerProps={{
        showCart: false,
        hideLinks: true,
        shopButton: false,
      }}
      seoParams={{ ...checkoutPageDetails.seoParams }}
    >
      <PageContainer name="checkout" padding="bottom" className="bg-white">
        <h1 className="sr-only">Checkout</h1>
        <Grid>
          <div className="pb-6 col-main lg:col-start-3 lg:col-end-13">
            <Link href="/cart" passHref data-cy="return-to-cart">
              <a>
                <Typography
                  variant="eyebrow"
                  Element="span"
                  color="helsinkiBlue-dark"
                >
                  &larr; {t('checkout_returntocart')}
                </Typography>
              </a>
            </Link>
          </div>
        </Grid>
        <Grid>
          <div className={pageStyles['Columns__OrderDetails']}>
            <div className={pageStyles['OrderDetailsWrapper']}>
              <CollapsableContent
                id="section-order-details"
                title={t('checkout_summary_order_details')}
                expandedAt="lg"
                indentContent={false}
                divider={false}
                titleTeaser={formatPrice(teaserPrice)}
              >
                <CheckoutOrderTable checkout={checkout} cart={cart} />
              </CollapsableContent>
            </div>
          </div>
          <div className={pageStyles['Columns__OrderAdditional']}>
            {!unrecoverableError ? (
              <>
                {userCohort !== UPGRADER &&
                  userCohort !== REPLACEMENT &&
                  userCohort !== UPGRADER_NOMEMBERSHIP &&
                  userCohort !== UPGRADER_MEMBERSHIP && (
                    <Checkbox
                      className="text-helsinkiBlue-dark"
                      label={t('checkout_form_gift')}
                      checked={isGift}
                      disabled={currentStep > 0}
                      onChange={handleToggleGift}
                      name="checkout-is-gift"
                    />
                  )}
                <CheckoutSteps
                  startingIndex={currentStep}
                  onStepChange={handleStepChange}
                  disableEdit={false}
                  steps={[
                    {
                      title: t('checkout_accountemail'),
                      RenderEditView: accountEmailEditView,
                      RenderCompleteView: () => (
                        <>
                          {isGift && (
                            <Typography color="helsinkiBlue-dark" weight="bold">
                              {t('checkout_form_recipient')}:
                            </Typography>
                          )}
                          <Typography color="helsinkiBlue-dark">
                            {checkout.email}
                          </Typography>
                        </>
                      ),
                      onEnter() {
                        metricReporter.increment('ecom.web.checkout.step', {
                          step: 'start_edit_email',
                        });
                      },
                    },
                    {
                      title: t('checkout_shippingaddress'),
                      RenderEditView: shippingAddressEditView,
                      RenderCompleteView: () => (
                        <>
                          {isGift && (
                            <Typography color="helsinkiBlue-dark" weight="bold">
                              {t('checkout_form_recipient')}:
                            </Typography>
                          )}
                          <div className="text-helsinkiBlue-dark">
                            <CheckoutAddressBlock
                              address={checkout.shippingAddress}
                            />
                          </div>
                        </>
                      ),
                      onEnter() {
                        metricReporter.increment('ecom.web.checkout.step', {
                          step: 'start_edit_shipping_address',
                        });
                      },
                    },
                    {
                      hidden: !expeditedShippingEnabled,
                      title: formatMessage({
                        id: 'checkout_shipping_method',
                      }),
                      RenderEditView: shippingMethodEditView,
                      RenderCompleteView: () => (
                        <Typography color="helsinkiBlue-dark">
                          {checkout.shippingRate && (
                            <>
                              {checkout.shippingRate.description_i18n_key
                                ? formatMessage({
                                    id: checkout.shippingRate
                                      .description_i18n_key,
                                  })
                                : checkout.shippingRate.description
                                ? checkout.shippingRate.description
                                : 'Shipping'}{' '}
                              -{' '}
                              {checkout.shippingRate.price > 0
                                ? formatPrice(checkout.shippingRate.price)
                                : formatMessage({ id: 'cart_free' })}
                            </>
                          )}
                        </Typography>
                      ),
                      onEnter() {
                        metricReporter.increment('ecom.web.checkout.step', {
                          step: 'start_edit_shipping_method',
                        });
                      },
                    },
                    {
                      title: t('checkout_billingaddress'),
                      RenderEditView: billingAddressEditView,
                      RenderCompleteView: () => (
                        <div className="text-helsinkiBlue-dark">
                          {checkout.billingAddress ===
                          SAME_SHIPPING_BILLING_ADDRESS ? (
                            <CheckoutAddressBlock
                              address={checkout.shippingAddress}
                            />
                          ) : (
                            <CheckoutAddressBlock
                              address={checkout.billingAddress}
                            />
                          )}
                        </div>
                      ),
                      onEnter() {
                        metricReporter.increment('ecom.web.checkout.step', {
                          step: 'start_edit_billing_address',
                        });
                      },
                    },
                    {
                      title: t('checkout_payment'),
                      editableStep: false,
                      RenderEditView: paymentEditView,
                      RenderCompleteView: paymentCompleteView,
                      onEnter() {
                        metricReporter.increment('ecom.web.checkout.step', {
                          step: 'start_edit_payment',
                        });
                      },
                    },
                  ]}
                />
              </>
            ) : (
              <>
                <Alert severity="error" data-cy="checkout-unrecoverable-error">
                  {t('checkout_error_onrecoverable')}
                </Alert>
                <Button
                  data-cy="button-retry-checkout"
                  onClick={handleRetryCheckout}
                  className="mt-4"
                >
                  {t('retry')}
                </Button>
              </>
            )}
          </div>
        </Grid>
      </PageContainer>
    </PageLayout>
  );
};

export default Checkout;
