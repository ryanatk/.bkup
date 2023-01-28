import { useCallback } from 'react';
import { object } from 'prop-types';
import cx from 'classnames';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router';

import { COLOR, ROUTE, TEXT } from 'common/const';
import { calculateCartTotals, date, DATE_FORMAT } from 'common/utils';
import {
  SubmitButton,
  TermsOfUseLink,
  PrivacyPolicyLink,
  Content,
} from 'common/components';
import { processCartPayment } from 'data/orders';

import { ORDER, STEP } from '../const';
import { useCartTotals, useEvent } from 'common/hooks';

import styles from './PlaceOrder.module.css';

const PlaceOrder = ({ state, setError }) => {
  const { isWireTransferTaxable, isServiceFeeTaxable, salesTax } = useEvent(
    state.eventId,
  ).data;

  const { totalsData, ooSummaryId } = useCartTotals();
  const recalculatedTotals = calculateCartTotals({
    paymentMethod: state.payment.method,
    totalsData,
    isWireTransferTaxable,
    isServiceFeeTaxable,
    salesTax,
  });

  const history = useHistory();

  const { mutate: submit, isLoading: isSubmitting } = useMutation(
    processCartPayment,
    {
      onSuccess: () => history.push(ROUTE.CONFIRMATION + '/' + ooSummaryId),
      onError: (err) => setError(err),
    },
  );

  const submitOrder = useCallback(() => {
    return submit({
      ...state,
      [ORDER.EXHIBITOR]: state[STEP.CONTACT][ORDER.ADDRESS],
      [ORDER.BILLING]: state[STEP.PAYMENT][ORDER.ADDRESS],
      [ORDER.PAYMENT]: state[STEP.PAYMENT],
      totalsData: recalculatedTotals,
      date: date().format(DATE_FORMAT.SERVER_DATE),
    });
  }, [state, submit, recalculatedTotals]);

  return (
    <Content error={state.error?.message}>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          submitOrder();
        }}
        className={styles.form}
      >
        <SubmitButton
          fullWidth
          isSubmitting={isSubmitting}
          disabled={!state.isDone}
        >
          Place Order
        </SubmitButton>

        <legend className={cx(TEXT.BODY_2, COLOR.GREY_400, styles.legend)}>
          By placing this order, you agree to our{' '}
          <TermsOfUseLink color="inherit" underline="always" /> and{' '}
          <PrivacyPolicyLink color="inherit" underline="always" />.
        </legend>
      </form>
    </Content>
  );
};

PlaceOrder.propTypes = {
  state: object,
};

export default PlaceOrder;
