import { useCallback, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { useShop } from 'app/context';
import {
  PAYMENT_METHOD,
  // PAYMENT_METHOD_TX,
} from 'common/const';
import { useCartTotals, useEvent } from 'common/hooks';
import { calculateCartTotals, currency, getSiteProps } from 'common/utils';
// import { getEventPaymentMethods } from 'data/events';
import { getMaxCreditCard } from 'data/orders';

const { PAYMENT_METHODS: authorizedPaymentMethods } = getSiteProps();

const useEventPaymentMethods = () => {
  const { totalsData, error: totalsError } = useCartTotals();
  const { eventId } = useShop();
  const { isWireTransferTaxable, isServiceFeeTaxable, salesTax } =
    useEvent(eventId).data;
  // const [authorizedPaymentMethods, setAuthorizedPaymentMethods] = useState([]);
  const [maxAlert, setMaxAlert] = useState(null);

  const totalsForCard = useMemo(
    () =>
      calculateCartTotals({
        paymentMethod: PAYMENT_METHOD.CARD,
        totalsData,
        isWireTransferTaxable,
        isServiceFeeTaxable,
        salesTax,
      }),
    [totalsData, isWireTransferTaxable, isServiceFeeTaxable, salesTax],
  );

  const { data: maxCreditCard } = useQuery(
    ['getMaxCreditCard'],
    () => getMaxCreditCard(),
    {
      onSuccess: (max) => {
        if (totalsForCard.total > max) {
          setMaxAlert(
            `Credit card is not available for orders with a grand total that is more than
          ${currency(max)}.`,
          );
        }
      },
    },
  );

  // const {
  //   isLoading,
  //   error,
  // } = useQuery(
  //   ['getEventPaymentMethods', eventId],
  //   () => getEventPaymentMethods(eventId),
  //   {
  //     onSuccess: (payload) => {
  //       // The db sends us payment types with a subset
  //       // defined by PAYMENT_METHOD_TX properties and
  //       // we need to filter and translate that to the
  //       // PAYMENT_METHOD values that our code uses.
  //       setAuthorizedPaymentMethods(
  //         payload
  //           .filter((pay) => PAYMENT_METHOD_TX[pay.method] !== undefined)
  //           .map((pay) => PAYMENT_METHOD_TX[pay.method]),
  //       );
  //     },
  //     refetchOnMount: true,
  //   },
  // );

  const shouldDisplayPaymentMethod = useCallback(
    (paymentMethod) => {
      if (!authorizedPaymentMethods.includes(paymentMethod)) {
        return false;
      }

      if (
        paymentMethod === PAYMENT_METHOD.CARD &&
        totalsForCard.total > maxCreditCard
      ) {
        return false;
      }

      return true;
    },
    [authorizedPaymentMethods, totalsForCard.total, maxCreditCard],
  );

  return {
    eventId,
    authorizedPaymentMethods,
    shouldDisplayPaymentMethod,
    isLoading: false,
    error: undefined,
    totalsError,
    maxAlert,
  };
};

export default useEventPaymentMethods;
