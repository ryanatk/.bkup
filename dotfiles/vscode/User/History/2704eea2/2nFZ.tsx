import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { t } from '../../../public/locales/LocaleContext';
import {
  SubscriptionInfo,
  useMySubscriptionInfo,
} from '../../../queries/MySubscription';
import { usePDPData } from '../../../queries/PDPData';
import {
  FreeTrialType,
  SubscriptionState,
} from '../../../queries/types/graphql-global-types';
import { getMyOrderPaymentMethod } from '../../../stores/myOrder/selectors';
import { SubscriptionStateType } from '../../../types/Subscription';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';
import isSubscriptionStateCancelable from '../../../utils/isSubscriptionStateCancelable';
import isValidSubscriptionPaymentMethod from '../../../utils/isValidSubscriptionPaymentMethod';
import {
  subscriptionTypeCanHavePaymentMethod,
  subscriptionTypeIsRenewable,
  subscriptionTypeRequiresPaymentMethod,
} from '../../../utils/subscriptionActions';
import { getSubscriptionStateType } from '../../../utils/subscriptionStatus';
import { Price, Typography } from '../../sormus';
import Button from '../../sormus/Button';
import MyAccountCancelMembershipModal from './MyAccountCancelMembershipModal';
import styles from './MyAccountMembershipStatus.module.scss';
import MyAccountSavedPaymentMethod from './MyAccountSavedPaymentMethod';

interface SubscriptionPrice {
  amount: number;
  currencyCode: string;
}

interface SubscriptionInfoDerived extends SubscriptionInfo {
  accountId: string;
  subscriptionId: string;
}

interface MyAccountMembershipStatusProps {
  authToken: string;
  subscriptionInfo: SubscriptionInfoDerived;
}

function MembershipPrimaryMessaging({
  subscriptionInfo,
  subscriptionStateType,
  defaultSubscriptionPrice,
}: {
  subscriptionInfo: SubscriptionInfo;
  subscriptionStateType: string;
  defaultSubscriptionPrice?: SubscriptionPrice;
}) {
  const { formatMessage } = useIntl();

  if (subscriptionInfo.dunningLevel > 0) {
    return (
      <span data-cy="membership-payment-failed">
        {t('my_account_sub_payment_failed')}
      </span>
    );
  }

  if (subscriptionStateType === SubscriptionStateType.PENDING_LIFETIME) {
    return (
      <span data-cy="membership-pending-lifetime">
        {t('my_account_sub_pending_lifetime')}
      </span>
    );
  } else if (subscriptionStateType === SubscriptionStateType.PENDING_SIXMONTH) {
    return (
      <span data-cy="membership-pending-sixmonth">
        {t('my_account_sub_pending_sixmonth')}
      </span>
    );
  } else if (subscriptionStateType === SubscriptionStateType.PENDING) {
    return (
      <span data-cy="membership-pending">{t('my_account_sub_pending')}</span>
    );
  } else if (
    subscriptionStateType === SubscriptionStateType.MEMBER_NO_PAYMENT
  ) {
    return (
      <span data-cy="membership-inactive">
        {t('my_account_sub_inactive', {
          yourMembership: formatMessage({
            id:
              subscriptionInfo.freeTrialType === FreeTrialType.SIXMONTH
                ? 'my_account_sub_inactive_trial'
                : 'my_account_sub_inactive_default',
          }),
        })}
      </span>
    );
  } else if (subscriptionStateType === SubscriptionStateType.LIFETIME) {
    return (
      <span data-cy="membership-active-lifetime">
        {t('my_account_sub_active_lifetime')}
      </span>
    );
  } else if (subscriptionStateType === SubscriptionStateType.TRIAL) {
    const monthlyFee = subscriptionInfo.monthlyFee;
    const expireDate = DateTime.fromISO(subscriptionInfo.endDate).toFormat(
      'DDD',
    );

    return (
      <>
        <Typography data-cy="membership-active-trial">
          {t('my_account_sub_active_trial', {
            expireDate,
          })}
        </Typography>
        <Typography>
          {t('my_account_sub_active_trial_has_payment', {
            price: (
              <Price
                price={monthlyFee.amount}
                currencyCode={monthlyFee.currency}
                showCurrency={false}
              />
            ),
          })}
        </Typography>
      </>
    );
  } else if (subscriptionStateType === SubscriptionStateType.TRIAL_NO_PAYMENT) {
    const expireDate = DateTime.fromISO(subscriptionInfo.endDate).toFormat(
      'DDD',
    );

    return (
      <>
        <span data-cy="membership-active-trial-no-payment">
          {t('my_account_sub_active_trial_no_payment', {
            expireDate,
            price: (
              <Price
                price={defaultSubscriptionPrice.amount}
                currencyCode={defaultSubscriptionPrice.currencyCode}
                showCurrency={false}
              />
            ),
          })}
        </span>
      </>
    );
  } else if (subscriptionStateType === SubscriptionStateType.MEMBER) {
    const { monthlyFee, nextBillingDate } = subscriptionInfo;

    const billingRate =
      monthlyFee?.amount && monthlyFee?.currency ? (
        <span data-cy="membership-active-billing-rate">
          {t('my_account_sub_active_billing_rate', {
            rate: (
              <>
                <Price
                  price={monthlyFee.amount}
                  currencyCode={monthlyFee.currency}
                  showCurrency={true}
                />
                /{t('my_account_subscription_term_month')}
              </>
            ),
          })}
        </span>
      ) : null;

    return (
      <>
        <Typography>{t('my_account_sub_active', { billingRate })}.</Typography>
        {nextBillingDate && (
          <Typography>
            {t('my_account_next_billing_date', {
              date: DateTime.fromISO(nextBillingDate).toFormat('DDD'),
            })}
          </Typography>
        )}
      </>
    );
  } else if (subscriptionStateType === SubscriptionStateType.MEMBER_B2B) {
    return (
      <Typography data-cy="membership-active-b2b">
        {t('my_account_sub_active', { billingRate: null })}
      </Typography>
    );
  } else if (
    subscriptionStateType ===
      SubscriptionStateType.MEMBER_PENDING_CANCELLATION ||
    subscriptionStateType === SubscriptionStateType.TRIAL_PENDING_CANCELLATION
  ) {
    return (
      <span data-cy="membership-cancelled-active">
        {t('my_account_sub_cancelled_active', {
          date: DateTime.fromISO(subscriptionInfo.endDate).toFormat('DDD'),
        })}
      </span>
    );
  }

  return (
    <span data-cy="membership-cancelled-inactive">
      {t('my_account_sub_cancelled_inactive')}
    </span>
  );
}

const MyAccountMembershipStatus = ({
  authToken,
  subscriptionInfo,
}: MyAccountMembershipStatusProps) => {
  const router = useRouter();
  const { data, isLoading } = usePDPData({ productHandle: 'subscription' });
  const { refetch: refetchMySubscriptionInfo } =
    useMySubscriptionInfo(authToken);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const showBillingHistory = checkFeatureFlag('my-account-billing-history');
  const cancelSubscriptionEnabled = checkFeatureFlag(
    'my-account-cancel-subscription',
  );
  const renewSubscriptionEnabled = checkFeatureFlag(
    'my-account-renew-subscription',
  );

  const subscriptionPaymentMethod = useSelector(
    getMyOrderPaymentMethod({ authToken }),
  );

  const subscriptionStateType = getSubscriptionStateType(subscriptionInfo);

  const savedPayment =
    subscriptionTypeCanHavePaymentMethod(subscriptionStateType) &&
    isValidSubscriptionPaymentMethod(subscriptionPaymentMethod)
      ? subscriptionPaymentMethod
      : null;

  const showAddPayment =
    subscriptionTypeRequiresPaymentMethod(subscriptionStateType) &&
    !savedPayment
      ? true
      : false;

  const isCancellable =
    cancelSubscriptionEnabled &&
    isSubscriptionStateCancelable(subscriptionStateType) &&
    !subscriptionInfo.isLocked;

  const isPending =
    subscriptionInfo.subscriptionState === SubscriptionState.PENDING;

  const allowRenewMembership =
    renewSubscriptionEnabled &&
    subscriptionTypeIsRenewable(subscriptionStateType);

  const showStatusColOnly =
    !savedPayment &&
    !showAddPayment &&
    !isCancellable &&
    !isPending &&
    !allowRenewMembership;

  const handleInitiateCancelMembership = () => setShowCancelModal(true);

  const handleConfirmCancelMembership = () => {
    setShowCancelModal(false);
    refetchMySubscriptionInfo();
  };

  const handleCloseCancelMembershipDialog = () => setShowCancelModal(false);

  const handleAddEditPayment = (authToken: string) => {
    router.push(`/my-account/${authToken}/membership/update-payment`);
  };

  if (isLoading) return null;

  return (
    <div className={styles.BillingAccountCard__Container}>
      <div
        className={`${
          showStatusColOnly
            ? styles['BillingAccountCard__StatusColumn--only']
            : styles['BillingAccountCard__StatusColumn']
        }`}
      >
        <Typography
          Element="h3"
          variant="h6"
          className={styles.BillingAccountCard__Header}
        >
          {t('my_account_sub_status_header')}
        </Typography>
        <Typography data-cy="subscription-status" Element="div">
          <MembershipPrimaryMessaging
            subscriptionInfo={subscriptionInfo}
            subscriptionStateType={subscriptionStateType}
            defaultSubscriptionPrice={
              data.content?.productByHandle?.comparePrice
            }
          />
        </Typography>
      </div>
      {savedPayment && (
        <div className={styles.BillingAccountCard__PaymentColumn}>
          <Typography
            Element="h3"
            variant="h6"
            className={styles.BillingAccountCard__Header}
            data-cy="subscription-payment-method"
          >
            {t('my_account_sub_payment_header')}
          </Typography>
          <MyAccountSavedPaymentMethod paymentMethod={savedPayment} />
        </div>
      )}
      {!showStatusColOnly && (
        <div className={styles.BillingAccountCard__ActionColumn}>
          <Typography
            Element="h3"
            variant="h6"
            className={styles.BillingAccountCard__Header}
            data-cy="subscription-action"
          >
            {t('my_account_sub_action_header')}
          </Typography>
          <div className={styles.BillingAccountCard__ActionButtonsContainer}>
            {allowRenewMembership ? (
              <div>
                <Button
                  link={true}
                  href={`/my-account/${authToken}/membership/update-payment`}
                  variant="tertiary"
                  size="small"
                  className="whitespace-nowrap"
                  data-cy="button-renew-subscription"
                >
                  {t('my_account_sub_renew_payment')}
                </Button>
              </div>
            ) : (
              <>
                {isPending && (
                  <Button
                    link
                    size="small"
                    href="https://support.ouraring.com/hc/en-us/articles/4411128662291-Setting-Up-Your-Gen3-Ring"
                    variant="tertiary"
                    className="whitespace-nowrap"
                    target="_blank"
                  >
                    {t('my_account_sub_learn_more')}
                  </Button>
                )}
                {savedPayment && (
                  <>
                    <div>
                      <Button
                        onClick={() => {
                          handleAddEditPayment(authToken);
                        }}
                        variant="tertiary"
                        size="small"
                        data-cy="link-edit-payment-method"
                        className="whitespace-nowrap"
                      >
                        {t('my_account_sub_edit_payment')}
                      </Button>
                    </div>
                    {showBillingHistory && (
                      <div>
                        <Button
                          link={true}
                          data-cy="subscription-history-button"
                          variant="tertiary"
                          size="small"
                          className="whitespace-nowrap"
                          href={`/my-account/${authToken}/membership/billing-history`}
                        >
                          {t('my_account_sub_payment_history')}
                        </Button>
                      </div>
                    )}
                  </>
                )}
                {showAddPayment && (
                  <div>
                    <Button
                      onClick={() => handleAddEditPayment(authToken)}
                      size="small"
                      data-cy="subscription-add-payment-method"
                      className="whitespace-nowrap"
                    >
                      {t('my_account_add_payment')}
                    </Button>
                  </div>
                )}
                {isCancellable && (
                  <div>
                    <Button
                      data-cy="subscription-cancel-button"
                      id="subscription-cancel" // this ID is used by Qualtrics
                      variant="basic"
                      className="underline text-helsinkiBlue whitespace-nowrap"
                      onClick={handleInitiateCancelMembership}
                    >
                      {t('my_account_sub_cancel_subscription')}
                    </Button>
                    <MyAccountCancelMembershipModal
                      isOpen={showCancelModal}
                      onKeep={handleCloseCancelMembershipDialog}
                      onClose={handleCloseCancelMembershipDialog}
                      onConfirm={handleConfirmCancelMembership}
                      authToken={authToken}
                      accountId={subscriptionInfo.accountId}
                      subscriptionId={subscriptionInfo.subscriptionId}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccountMembershipStatus;
