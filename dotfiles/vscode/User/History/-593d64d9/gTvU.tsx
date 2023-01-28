import router, { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { FormattedNumber, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutAddressBlock from '../../../../components/pages/checkout/CheckoutAddressBlock';
import CheckoutBillingForm from '../../../../components/pages/checkout/CheckoutBillingForm';
import CheckoutSteps from '../../../../components/pages/checkout/CheckoutSteps';
import loadMyAccountScripts from '../../../../components/pages/my-account/loadMyAccountScripts';
import MyAccountAddPayment, {
  OnSaveStatus,
} from '../../../../components/pages/my-account/MyAccountAddPayment';
import MyAccountMembershipCountryNotice from '../../../../components/pages/my-account/MyAccountMembershipCountryNotice';
import MyAccountSavedPaymentMethod from '../../../../components/pages/my-account/MyAccountSavedPaymentMethod';
import MyAccountWrapper from '../../../../components/pages/my-account/MyAccountWrapper';
import {
  Alert,
  BodyLink,
  Redirect,
  Typography,
} from '../../../../components/sormus';
import useEmailTokenFromAuthToken from '../../../../hooks/useEmailTokenFromAuthToken';
import { t } from '../../../../public/locales/LocaleContext';
import { useMySubscriptionInfo } from '../../../../queries/MySubscription';
import { useRenewSubscription } from '../../../../queries/RenewSubscription';
import {
  MyOrderAction,
  reqMyOrderUpdatePaymentMethodBillingAddress,
} from '../../../../stores/myOrder/actions';
import {
  getMyOrderPaymentMethodBillingAddress,
  getMyOrderUpdatePaymentBillingAddress,
} from '../../../../stores/myOrder/selectors';
import {
  MY_ORDER_UPDATE_PAYMENT_METHOD_INIT,
  MY_ORDER_UPDATE_PAYMENT_METHOD_RESET,
} from '../../../../stores/types';
import { CheckoutAddress } from '../../../../types/CheckoutState';
import { SubscriptionRatePlan } from '../../../../types/Subscription';
import checkFeatureFlag from '../../../../utils/checkFeatureFlag';
import isValidSubscriptionPaymentMethod from '../../../../utils/isValidSubscriptionPaymentMethod';
import logToDatadog from '../../../../utils/logToDatadog';
import mapSubscriptionAddressToUiAddress from '../../../../utils/mapSubscriptionAddressToUiAddress';
import {
  getMetricReporter,
  metricError,
  metricRequest,
  metricSuccess,
} from '../../../../utils/reportMetrics';
import { subscriptionTypeIsRenewable } from '../../../../utils/subscriptionActions';
import { getSubscriptionStateType } from '../../../../utils/subscriptionStatus';

const metricReporter = getMetricReporter();

export interface SavePaymentResponse {
  status: OnSaveStatus;
  message: string;
  paymentMethodId?: string;
  accountId?: string;
  gateway?: string;
  subscriptionRate?: SubscriptionRatePlan | null;
}

const UPDATE_PAYMENT_METRIC_NAME = 'ecom.web.my_account.update_payment';
const RENEW_METRIC_NAME = 'ecom.web.my_account.renew';

const PAYMENT_METHOD_STEP = 1;

const Page = ({ authToken }) => {
  // If the user doesn't have the email token already, fetch it via their auth token to use in logs
  useEmailTokenFromAuthToken(authToken);
  const dispatch = useDispatch() as (action: MyOrderAction) => void;
  const {
    data: subscriptionInfo,
    isLoading,
    isError,
    paymentMethod,
    refetch: refetchSubscriptionInfo,
  } = useMySubscriptionInfo(authToken);
  const { mutateRenewSubscription } = useRenewSubscription();

  const billingAddress = useSelector(
    getMyOrderPaymentMethodBillingAddress({ authToken }),
  );
  const savedBillingAddress = useSelector(
    getMyOrderUpdatePaymentBillingAddress({ authToken }),
  );

  /**
   * Get previously stored billing address, or billing address from subscription
   */
  const paymentBillingAddress: CheckoutAddress = savedBillingAddress?.country
    ? savedBillingAddress
    : mapSubscriptionAddressToUiAddress(billingAddress);

  const myAccountMembership = checkFeatureFlag('my-account-mermbership');
  const showRenewSubscription = checkFeatureFlag(
    'my-account-renew-subscription',
  );
  const isCountryEnabled = checkFeatureFlag('membership-country-enabled');
  const isCountriesShowAll = checkFeatureFlag('membership-country-show-all');
  const { query } = useRouter();
  const { formatMessage } = useIntl();
  const [saveResponse, setSaveResponse] = useState<
    SavePaymentResponse | undefined
  >();

  const [currentStep, setCurrentStep] = useState(0);
  const [isRenewFlow, setIsRenewFlow] = useState(false);

  useEffect(() => {
    loadMyAccountScripts();
    // don't clean up, so we only load scripts once
  }, []);

  /**
   * Determine if we're in renew flow
   */
  useEffect(() => {
    if (!subscriptionInfo) return;

    // Get derived subscription state type
    const subscriptionStateType = getSubscriptionStateType(subscriptionInfo);

    // Flag for if we're in the renew flow
    setIsRenewFlow(
      showRenewSubscription &&
        subscriptionTypeIsRenewable(subscriptionStateType),
    );
  }, [subscriptionInfo]);

  /**
   * Initialize update payment
   */
  useEffect(() => {
    dispatch({
      type: MY_ORDER_UPDATE_PAYMENT_METHOD_INIT,
      payload: { authToken },
    });
  }, []);

  /**
   * Scroll to top of page on saveResponse change
   */
  useEffect(() => {
    if (saveResponse?.status) {
      window.scrollTo(0, 0);
      dispatch({
        type: MY_ORDER_UPDATE_PAYMENT_METHOD_RESET,
        payload: { authToken },
      });
      refetchSubscriptionInfo();
    }
  }, [saveResponse]);

  /**
   * Handle save payment
   */
  const handleSavePayment = async (response: SavePaymentResponse) => {
    if (
      response.status === OnSaveStatus.Success &&
      isRenewFlow &&
      response.subscriptionRate
    ) {
      metricRequest(RENEW_METRIC_NAME);
      metricReporter.increment('ecom.web.my_account.update_payment.step', {
        step: 'save_payment_success',
        flow: 'renew',
      });

      mutateRenewSubscription.mutate(
        {
          token: authToken,
          paymentMethodId: response.paymentMethodId,
          countryCode: savedBillingAddress?.country,
          accountId: response.accountId,
          subscriptionProductRatePlanId: response.subscriptionRate.id,
        },
        {
          onSuccess: () => {
            setSaveResponse({
              ...response,
              message: formatMessage({
                id: 'my_account_subscription_renew_success',
              }),
            });
            metricSuccess(RENEW_METRIC_NAME, {
              ...response,
              subscriptionRate: response.subscriptionRate,
              ...subscriptionInfo,
            });
            logToDatadog(
              'my_account',
              'Subscription successfully renewed.',
              {
                ...response,
                subscriptionRate: response.subscriptionRate,
                ...subscriptionInfo,
              },
              'info',
            );
          },
          onError: () => {
            setSaveResponse({
              ...response,
              status: OnSaveStatus.Error,
              message: formatMessage({
                id: 'my_account_subscription_renew_failure',
              }),
            });

            metricError(RENEW_METRIC_NAME, {
              ...response,
              subscriptionRate: response.subscriptionRate,
              ...subscriptionInfo,
            });

            logToDatadog('my_account', 'Subscription could not be renewed.', {
              ...response,
              subscriptionRate: response.subscriptionRate,
              ...subscriptionInfo,
            });
          },
        },
      );
    } else {
      metricRequest(UPDATE_PAYMENT_METRIC_NAME);

      if (response.status === OnSaveStatus.Error) {
        metricReporter.increment('ecom.web.my_account.update_payment.step', {
          step: 'save_payment_error',
        });
        metricError(UPDATE_PAYMENT_METRIC_NAME, {
          ...response,
          subscriptionRate: response.subscriptionRate,
          ...subscriptionInfo,
        });

        logToDatadog(
          'my_account',
          'Error adding/editing subscription payment.',
          {
            ...response,
            subscriptionRate: response.subscriptionRate,
            ...subscriptionInfo,
          },
        );
      } else {
        metricReporter.increment('ecom.web.my_account.update_payment.step', {
          step: 'save_payment_success',
          flow: 'edit',
        });
        metricSuccess(UPDATE_PAYMENT_METRIC_NAME, {
          response,
          subscriptionRate: response.subscriptionRate,
          subscriptionInfo,
        });
        logToDatadog(
          'my_account',
          'Subscription payment successfully added/edited.',
          {
            ...response,
            subscriptionRate: response.subscriptionRate,
            ...subscriptionInfo,
          },
          'info',
        );
      }

      setSaveResponse(response);
    }
  };

  const editPaymentView = useCallback(
    () => (
      <MyAccountAddPayment
        accountId={subscriptionInfo.accountId}
        subscriptionId={subscriptionInfo.subscriptionId}
        billingAddress={paymentBillingAddress}
        onSave={handleSavePayment}
        authToken={authToken}
        isRenewFlow={isRenewFlow}
      />
    ),
    [
      subscriptionInfo,
      saveResponse,
      paymentBillingAddress,
      authToken,
      isRenewFlow,
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

  if (!myAccountMembership)
    return <Redirect path={`/my-account/${authToken}/membership`} />;
  if (isLoading) return null;
  if (isError)
    return <Alert severity="error">{t('error_subscription_error')}</Alert>;

  // Get displayable subscription rate (use subscriptionInfo monthly fee if we have it)
  const displayableSubscriptionRate =
    subscriptionInfo.monthlyFee?.amount && subscriptionInfo.monthlyFee?.currency
      ? subscriptionInfo.monthlyFee
      : false;

  return (
    <MyAccountWrapper authToken={authToken}>
      <div className="my-8" data-cy="my-account-update-payment">
        <Typography variant="caption" className="mb-4 cursor-pointer">
          <BodyLink
            onClick={() => {
              router.push(`/my-account/${authToken}/membership`);
            }}
            color="helsinki-blue"
          >
            <>&larr; {formatMessage({ id: 'my_account_navigate_back' })}</>
          </BodyLink>
        </Typography>

        {saveResponse?.status === OnSaveStatus.Success ? (
          <Alert
            className="mb-4"
            data-cy="my-account-update-payment-success"
            severity="success"
          >
            {saveResponse.message}
          </Alert>
        ) : (
          <>
            {saveResponse?.status === OnSaveStatus.Error && (
              <Alert
                className="mb-4"
                data-cy="my-account-update-payment-error"
                severity="error"
              >
                {saveResponse.message}
              </Alert>
            )}
            {isValidSubscriptionPaymentMethod(paymentMethod) && (
              <div className="mb-4" data-cy="my-account-current-payment-method">
                <Typography Element="h3" variant="body" className="mb-1">
                  {t('my_account_current_payment_method_title')}
                </Typography>
                <div className="bg-sand-light p-3 rounded border border-sand">
                  <MyAccountSavedPaymentMethod paymentMethod={paymentMethod} />
                </div>
              </div>
            )}
            {!isRenewFlow &&
              displayableSubscriptionRate.amount &&
              displayableSubscriptionRate.currency && (
                <Typography
                  className="mb-4"
                  data-cy="my-account-subscription-amount"
                >
                  {t('my_account_subscription_amount', {
                    amount: (
                      <FormattedNumber
                        value={displayableSubscriptionRate.amount}
                        style="currency"
                        currency={displayableSubscriptionRate.currency}
                      />
                    ),
                  })}
                </Typography>
              )}
            <MyAccountMembershipCountryNotice />
            <CheckoutSteps
              startingIndex={currentStep}
              steps={[
                {
                  title: t('checkout_billingaddress'),
                  RenderEditView: ({ handleContinue, loading }) => (
                    <CheckoutBillingForm
                      loading={loading}
                      initialValues={paymentBillingAddress}
                      showAllCountries={isCountriesShowAll}
                      disableCountry={
                        !(
                          isCountryEnabled || // feature flag to force enabling
                          Boolean(
                            billingAddress?.country, // if not forced, still enable when country is preselected
                          )
                        )
                      }
                      onSubmit={(address) => {
                        dispatch(
                          reqMyOrderUpdatePaymentMethodBillingAddress({
                            billingAddress: address,
                            authToken,
                          }),
                        );

                        handleContinue();
                      }}
                    />
                  ),
                  RenderCompleteView: () => (
                    <CheckoutAddressBlock address={paymentBillingAddress} />
                  ),
                  onEnter() {
                    metricReporter.increment(
                      'ecom.web.my_account.update_payment.step',
                      {
                        step: 'start_edit_billing_address',
                        flow: isRenewFlow ? 'renew' : 'edit',
                      },
                    );
                  },
                },
                {
                  title: t('checkout_payment'),
                  RenderEditView: editPaymentView,
                  RenderCompleteView: () => null,
                  onEnter() {
                    metricReporter.increment(
                      'ecom.web.my_account.update_payment.step',
                      {
                        step: 'start_edit_payment',
                        flow: isRenewFlow ? 'renew' : 'edit',
                      },
                    );
                  },
                },
              ]}
            />
          </>
        )}
      </div>
    </MyAccountWrapper>
  );
};

Page.getInitialProps = async ({ query }) => {
  return {
    authToken: query.authToken,
  };
};

Page.pageName = 'My Account';
Page.isSormusCompatible = true;

export default Page;
