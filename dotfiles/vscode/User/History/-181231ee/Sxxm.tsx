import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { EventType, sendGTMWithSegmentEvent } from '../../analytics';
import CheckoutAccountEmail from '../../components/pages/checkout/CheckoutAccountEmail';
import CheckoutAddressBlock from '../../components/pages/checkout/CheckoutAddressBlock';
import CheckoutBillingForm from '../../components/pages/checkout/CheckoutBillingForm';
import CheckoutMembershipPaymentForm from '../../components/pages/checkout/CheckoutMembershipPaymentForm';
import CheckoutPaymentForm from '../../components/pages/checkout/CheckoutPaymentForm';
import CheckoutShippingForm from '../../components/pages/checkout/CheckoutShippingForm';
import CheckoutShippingMethodForm from '../../components/pages/checkout/CheckoutShippingMethodForm';
import CheckoutSteps from '../../components/pages/checkout/CheckoutSteps';
import loadCheckoutScripts from '../../components/pages/checkout/loadCheckoutScripts';
import Alert from '../../components/sormus/Alert';
import Box from '../../components/sormus/Box';
import Button from '../../components/sormus/Button';
import Checkbox from '../../components/sormus/Checkbox';
import CheckoutOrderTable from '../../components/sormus/CheckoutOrderTable';
import CollapsableContent from '../../components/sormus/CollapsableContent';
import Footer from '../../components/sormus/Footer';
import Header from '../../components/sormus/Header';
import PageContainer from '../../components/sormus/PageContainer';
import Redirect from '../../components/sormus/Redirect';
import Typography from '../../components/sormus/Typography';
import { getBilboDiscountData } from '../../helpers/bilboHelper';
import useCurrency from '../../helpers/useCurrency';
import { t } from '../../public/locales/LocaleContext';
import { NETSUITE_SHIPPING_METHODS } from '../../services/server/calculateService';
import { reqSegmentEvent } from '../../stores/app/actions';
import { getCartSelector } from '../../stores/cart/selectors';
import {
  reqRetryCheckoutAction,
  reqUpdateCheckoutAccountEmailAction,
  reqUpdateCheckoutBillingAddressAction,
  reqUpdateCheckoutShippingAddressAction,
  reqUpdateCheckoutShippingMethodAction,
} from '../../stores/checkout/actions';
import { getCheckoutSelector } from '../../stores/checkout/selectors';
import CheckoutState, {
  CheckoutAddress,
  CheckoutShippingRate,
} from '../../types/CheckoutState';
import { getCartRingCount } from '../../utils/cartCount';
import cartIncludesRing from '../../utils/cartIncludesRing';
import checkFeatureFlag from '../../utils/checkFeatureFlag';
import getCohort, { REPLACEMENT, UPGRADER } from '../../utils/getBilboCohort';
import { reportBadExperience } from '../../utils/reportMetrics';
import pageStyles from './index.module.scss';

export const SAME_SHIPPING_BILLING_ADDRESS = 'same';

const Page = () => {
  const { asPath, query } = useRouter();
  const dispatch = useDispatch();
  const checkout = useSelector(getCheckoutSelector);
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
  const isMultilineEnabled = checkFeatureFlag('enable-multi-line-items');
  const affirmOneShot = checkFeatureFlag('affirm-subscription');
  const allowAffirmOneShotCheckout =
    affirmOneShot &&
    cartIncludesRing(checkout.cart) &&
    getCartRingCount(checkout.cart) === 1;
  const [hideMembershipPayment, setHideMembershipPayment] = useState(true);
  const PAYMENT_METHOD_STEP = expeditedShippingEnabled ? 4 : 3;

  const { campaign } = discount;

  const teaserPrice = checkout.totalPriceAfterTax
    ? checkout.totalPriceAfterTax
    : cart.totalPriceAfterDiscount;

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
    if (hideMembershipPayment) return null;
    else
      return (
        <>
          <Typography color="helsinkiBlue-dark">
            Ring payment details for Affirm successfully received.
          </Typography>
        </>
      );
  };

  /**
   * Memoize sub payment edit view
   * Prevents uneccesary re-renders when checkout state changes
   */
  const subscriptionPaymentEditView = useCallback(
    () => (
      <CheckoutMembershipPaymentForm
        onUnrecoverableError={() => setUnrecoverableError(true)}
      />
    ),
    [checkout.error, checkout.paymentToken, checkout.gateway],
  );

  /**
   * Memoize shipping address edit view
   * Prevents uneccesary re-renders when checkout state changes
   */
  const shippingAddressEditView = useCallback(
    ({ handleContinue, setLoading }) => (
      <CheckoutShippingForm
        initialValues={checkout.shippingAddress}
        loading={checkout.isLoading}
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
              loading={checkout.isLoading}
              onSubmit={(billingAddress: CheckoutAddress) => {
                setLoading(true);

                dispatch(
                  reqUpdateCheckoutBillingAddressAction(
                    {
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
                reqUpdateCheckoutBillingAddressAction(
                  {
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

  useEffect(() => {
    if (allowAffirmOneShotCheckout && checkout.affirmPaymentToken) {
      setHideMembershipPayment(false);
    }
  }, [checkout.affirmPaymentToken]);

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

  if (!checkout || (!checkout.initiated && !checkout.order))
    return <Redirect path="/cart" />;

  const MAX_RINGS_PER_ORDER = isMultilineEnabled ? 10 : 1;

  if (cart && getCartRingCount(cart) > MAX_RINGS_PER_ORDER)
    return <Redirect path="/cart" />;

  return (
    <div className="tailwind">
      <Header showCart={false} hideLinks={true} shopButton={false} />
      <PageContainer name="checkout" padding="none" className="bg-white">
        <Box className="pt-6">
          <div className="pb-6">
            <Link href="/cart" passHref>
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
          <div className={pageStyles.Columns}>
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
                  {userCohort !== UPGRADER && userCohort !== REPLACEMENT && (
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
                              <Typography
                                color="helsinkiBlue-dark"
                                weight="bold"
                              >
                                {t('checkout_form_recipient')}:
                              </Typography>
                            )}
                            <Typography color="helsinkiBlue-dark">
                              {checkout.email}
                            </Typography>
                          </>
                        ),
                      },
                      {
                        title: t('checkout_shippingaddress'),
                        RenderEditView: shippingAddressEditView,
                        RenderCompleteView: () => (
                          <>
                            {isGift && (
                              <Typography
                                color="helsinkiBlue-dark"
                                weight="bold"
                              >
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
                      },
                      {
                        title: t('checkout_payment'),
                        editableStep: false,
                        RenderEditView: paymentEditView,
                        RenderCompleteView: paymentCompleteView,
                      },
                      {
                        hidden: hideMembershipPayment,
                        title: t('checkout_payment_subscription'),
                        RenderEditView: subscriptionPaymentEditView,
                        RenderCompleteView: () => null,
                      },
                    ]}
                  />
                </>
              ) : (
                <>
                  <Alert
                    severity="error"
                    data-cy="checkout-unrecoverable-error"
                  >
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
          </div>
        </Box>
      </PageContainer>
      <Footer />
    </div>
  );
};

Page.pageName = 'Checkout';
Page.isSormusCompatible = true;

export default Page;
