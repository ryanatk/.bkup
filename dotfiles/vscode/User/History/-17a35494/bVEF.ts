import { PdpDiscountData } from '../helpers/discounts/usePdpDiscountData';
import { MessageKey } from '../public/locales/setup';
import DiscountsState from '../types/DiscountsState';

export const CAMPAIGN_TAF = 'taf_2020';
export const CAMPAIGN_RAF = 'raf_2022_sept';
export const CAMPAIGN_UPGRADER_GEN1 = 'upgrader_2022_gen12';
export const CAMPAIGN_UPGRADER_GEN3 = 'upgrader_2022_gen3';

export const MESSAGE_FREE_SHIPPING = 'pdp_discount_free_shipping';
export const MESSAGE_FREE_SHIPPING_HORIZON = 'horizon_free_shipping';
export const MESSAGE_SUCCESS_RAF = 'banner_message_refer_a_friend';
export const MESSAGE_SUCCESS_TAF = 'bilbo_banner_message_tell_a_friend';
export const MESSAGE_SUCCESS_DEFAULT = 'pdp_discount_applied';

export const ERROR_EXPIRED = 'expired';
export const ERROR_NO_USES_REMAIN = 'no_uses_remaining';

export const MESSAGE_ERROR_USED = 'pdp_discount_error_used';
export const MESSAGE_ERROR_EXPIRED = 'pdp_discount_error_expired';
export const MESSAGE_ERROR_DEFAULT = 'pdp_discount_error';

const invalidMessages = (reason?: string) => {
  switch (reason) {
    case ERROR_NO_USES_REMAIN:
      return MESSAGE_ERROR_USED;

    case ERROR_EXPIRED:
      return MESSAGE_ERROR_EXPIRED;

    default:
      return MESSAGE_ERROR_DEFAULT;
  }
};

const getDiscountAppliedMessage = (
  discountData: PdpDiscountData,
  isRAFMessageEnabled?: boolean,
) => {
  const { campaign, appliedDiscountCode } = discountData;
  const defaultMessage = appliedDiscountCode ? MESSAGE_SUCCESS_DEFAULT : null;

  switch (campaign) {
    case CAMPAIGN_TAF:
      return MESSAGE_SUCCESS_TAF;
    case CAMPAIGN_RAF:
      if (isRAFMessageEnabled) {
        return MESSAGE_SUCCESS_RAF;
      } else {
        return defaultMessage;
      }
    case CAMPAIGN_UPGRADER_GEN1:
    case CAMPAIGN_UPGRADER_GEN3:
      return MESSAGE_FREE_SHIPPING_HORIZON;
  }

  return defaultMessage;
};

const getDiscountMessage = (
  discountData: PdpDiscountData,
  discountState: DiscountsState,
  isRAFMessageEnabled?: boolean,
): MessageKey => {
  const { errorMessage, invalidReason } = discountData;
  const { discountError } = discountState;

  if (errorMessage) return errorMessage;
  if (invalidReason) return invalidMessages(invalidReason);
  if (discountError) return invalidMessages();

  return getDiscountAppliedMessage(discountData, isRAFMessageEnabled);
};

export default getDiscountMessage;
