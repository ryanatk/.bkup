import { useCallback, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { useShop } from 'app/context';
import { PAYMENT_METHOD } from 'common/const';
import { useCartTotals, useEvent } from 'common/hooks';
import { calculateCartTotals, currency, getSiteProps } from 'common/utils';
import { getMaxCreditCard } from 'data/lookup';

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

  // TODO: handle errors (and isLoading)
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
      refetchOnMount: true,
    },
  );

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
    [
      // authorizedPaymentMethods,
      totalsForCard.total,
      maxCreditCard,
    ],
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
