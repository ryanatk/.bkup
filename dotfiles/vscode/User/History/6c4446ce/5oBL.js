import { useMemo } from 'react';
import { any, string } from 'prop-types';

import { Card, Content, OrderSummary } from 'common/components';
import { useCartTotals, useEvent } from 'common/hooks';
import { calculateCartTotals } from 'common/utils';
import { useShop } from 'app/context';

const Summary = ({ paymentMethod, children }) => {
  const { totalsData, isLoading, error } = useCartTotals();
  const { eventId } = useShop();
  const { isWireTransferTaxable, isServiceFeeTaxable, salesTax } =
    useEvent(eventId).data;

  // console.log('<Summary>', { totalsData });

  const recalculatedTotals = useMemo(
    () =>
      calculateCartTotals({
        paymentMethod,
        totalsData,
        isWireTransferTaxable,
        isServiceFeeTaxable,
        salesTax,
      }),
    [
      paymentMethod,
      totalsData,
      isWireTransferTaxable,
      isServiceFeeTaxable,
      salesTax,
    ],
  );

  return (
    <Card>
      <Content isLoading={isLoading} error={error?.message}>
        {children}
        {recalculatedTotals && (
          <OrderSummary
            totals={recalculatedTotals}
            paymentMethod={paymentMethod}
          />
        )}
      </Content>
    </Card>
  );
};

Summary.propTypes = {
  paymentMethod: string,
  children: any,
};

export default Summary;
