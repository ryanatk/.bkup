import axios from 'axios';

import { getBaseUrl, log, scrubString } from 'common/utils';
import { VALID, CREDIT_CARD, PAYMENT_METHOD, ENV } from 'common/const';

import mock from './processCartPayment.mock';

const baseUrl = getBaseUrl(2);

/**
 * Process a card payment
 * @param {object} order
 * @returns "Successful"
 */
const processCartPayment = async (order) => {
  const {
    customerId,
    ooSummaryId: ooId,
    eventId,
    merchantId,
    exhibitorAddressId,
    billingAddressId,
    totalsData: totals,
  } = order;

  await VALID.checkAll(
    ['customerId', customerId, VALID.CUSTOMER_ID],
    ['exhibitorAddressId', exhibitorAddressId, VALID.EXHIBITOR_ADDRESS_ID],
    ['billingAddressId', billingAddressId, VALID.BILLING_ADDRESS_ID],
    ['paymentExpiration', order.paymentData.expiration, VALID.EXPIRATION_DATE],
  );

  const { contact, paymentData } = order;

  const [expirationMonth, expirationYear] = paymentData.expiration?.split('/');

  const inputAccountNumber = paymentData.accountNumber;

  const card = Object.values(CREDIT_CARD).find(({ firstDigit }) =>
    firstDigit.find(
      (digit) => Number(inputAccountNumber.charAt(0)) === Number(digit),
    ),
  );
  const type = card.db;

  if (!inputAccountNumber || inputAccountNumber.length < 4) {
    throw new Error('Card Number is required!');
  }

  const accountNumber = scrubString(inputAccountNumber);
  const last4 = accountNumber.substring(accountNumber.length - 4);

  if (!totals) {
    throw new Error(
      "Unable to process order because we don't have cart totals!",
    );
  }

  const isGuaranteedCard =
    paymentData.method !== PAYMENT_METHOD.CARD || totals.total === 0;

  try {
    const orderDetails = {
      ooId,
      customerId,
      eventId,
      merchantId,
      isThirdParty: contact.isThirdParty === 'Yes',
      exhAddId: exhibitorAddressId,
      billingAddId: billingAddressId,
      thirdPartyName: contact.exhibitorInfo,
      isGuaranteedCard,
      paymentData: {
        cvv: paymentData.cvv,
        nameOnCard: paymentData.name,
        firstName: paymentData.firstName,
        lastName: paymentData.lastName,
        address1: paymentData.address1,
        address2: paymentData.address2,
        city: paymentData.city,
        state: paymentData.state,
        zip: paymentData.zip,
        country: paymentData.countryCode,
        email: contact.email,
        accountNumber: accountNumber,
        companyName: contact.companyName,
        accountNumberExpMM: expirationMonth,
        accountNumberExpYY: expirationYear,
        type,
        last4Digit: last4,
        amount: totals.total,
        status: 'active',
        isGuaranteedCard,
        paymentType:
          paymentData.method === PAYMENT_METHOD.CARD
            ? type
            : paymentData.method,
      },
    };

    const result = ENV.IS_MOCK
      ? mock()
      : await axios.post(
          `${baseUrl}orders2/process_cart_payment`,
          orderDetails,
        );

    return result;
  } catch (error) {
    log('processCartPayment', {
      data: {
        customerId,
        ooId,
        eventId,
        merchantId,
        exhibitorAddressId,
        billingAddressId,
        totals,
      },
      error,
      throw: true,
      type: 'request',
    });
  }
};

export default processCartPayment;
