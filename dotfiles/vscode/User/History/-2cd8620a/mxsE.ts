import { OrderType } from '../../types/CheckoutState';
import serviceAPI from '../../utils/backendAPI';
import { getCookie } from '../../utils/cookie';
import logToDatadog from '../../utils/logToDatadog';

const DEFAULT_ORDER_TYPE = 'hardware_only';

/**
 * Check and get partner code based on Google Analytics UTM parameters used by
 * partners to specify point of sale based on cookies
 */
export function getUtmParamPartnerCode() {
  // Need to filter that since google uses the same UTM params for many applications
  const allowedUTMPartnerCodes = ['therabody'];

  const UTM_PARAM_SOURCE = getCookie('__attentive_utm_param_source');
  const UTM_PARAM_CONTENT = getCookie('__attentive_utm_param_content');

  if (!allowedUTMPartnerCodes.includes(UTM_PARAM_SOURCE)) return null;

  if (!UTM_PARAM_CONTENT) return UTM_PARAM_SOURCE;

  const componsedPartnerCode = `${UTM_PARAM_SOURCE}_${UTM_PARAM_CONTENT}`;
  return componsedPartnerCode;
}

/**
 * Get order type based on email verification for existent subscription
 * All purchases must be hardware_only if the given email already have a subscription
 * NOTE: Should fallback to DEFAULT_ORDER_TYPE if email check fails and log it
 */
export async function getEmailVerification(email: string): Promise<OrderType> {
  try {
    const response = await serviceAPI.get(
      '/v1/api/public/subscription/getEmailVerification/' +
        encodeURIComponent(email),
    );

    if (!response || response.status !== 200)
      throw new Error('Call to subscription/getEmailVerification failed');

    return response?.orderType || DEFAULT_ORDER_TYPE;
  } catch (error) {
    logToDatadog(
      'checkout',
      'Subscription check by email failed - Set default order type ' +
        DEFAULT_ORDER_TYPE,
      { error },
      'warn',
    );

    return DEFAULT_ORDER_TYPE;
  }
}
