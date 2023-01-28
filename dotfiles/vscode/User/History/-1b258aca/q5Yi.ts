import { useState } from 'react';
import usePdpDiscountData from '../../../helpers/discounts/usePdpDiscountData';
import { SAME_SHIPPING_BILLING_ADDRESS } from '../../../pages/checkout';
import { t } from '../../../public/locales/LocaleContext';
import CheckoutState, { CheckoutAddress } from '../../../types/CheckoutState';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';
import getCohort, {
  REPLACEMENT,
  UPGRADER,
} from '../../../utils/getBilboCohort';

const usePayment = (checkout: CheckoutState) => {
  const showAffirm = checkFeatureFlag('show-affirm');
  const [affirmAction, setAffirmAction] = useState<any>();
  const { campaign } = usePdpDiscountData();
  const cohort = getCohort(campaign);
  const address: CheckoutAddress =
    checkout.billingAddress === SAME_SHIPPING_BILLING_ADDRESS ||
    checkout.billingAddress === true
      ? checkout.shippingAddress
      : checkout.billingAddress;
  /** Controls whether to show affirm payment option */
  const canShowAffirm =
    showAffirm && cohort !== UPGRADER && address.country === 'US';
  const alertText =
    cohort === REPLACEMENT
      ? t('checkout_warranty_replacement_copy')
      : t('checkout_free_ring_copy');

  /**
   * Handles set the affirm payment callback action
   */
  const affirmActionCallback = ({ openAffirm }) => {
    setAffirmAction({ openAffirm });
  };
  return {
    affirmAction,
    affirmActionCallback,
    canShowAffirm,
    alertText,
  };
};
export default usePayment;
