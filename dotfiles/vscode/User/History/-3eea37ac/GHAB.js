import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useQuery } from 'react-query';

import { useOrders, useCustomer, useShop } from 'app/context';
import { Require } from 'common/components';
import { ROUTE } from 'common/const';
import { Page } from 'common/site';
import { useEvent } from 'common/hooks';
import { answerQuestions } from 'common/utils';

import { STEP, PAYMENT } from '../const';
import { BoothInfo, BoothQuestions, Contact, Payment } from '../Steps';
import Summary from './Summary';
import PlaceOrder from './PlaceOrder';
import reducer, { init, TYPE } from './reducer';
import { getAssessmentList } from 'data/events';

import styles from './Checkout.module.css';

const Checkout = () => {
  const { eventId, ooSummaryId } = useShop();
  const { merchantId } = useEvent(eventId).data;
  const { customerId, ...customer } = useCustomer();

  const orders = useOrders();
  const order = useMemo(
    () => orders.findOrder(ooSummaryId),
    [orders, ooSummaryId],
  );

  const [state, dispatch] = useReducer(
    reducer,
    {
      [STEP.CONTACT]: customer,
      customerId,
      eventId,
      merchantId,
      ooSummaryId,
    },
    init,
  );

  const updateQuestions = useCallback(
    () =>
      dispatch({
        type: TYPE.LOAD_ANSWERS,
        payload: order?.assessmentResponseData ?? [],
      }),
    [order.assessmentResponseData],
  );

  const { refetch: fetchQuestions, isLoading: isLoadingQuestions } = useQuery(
    ['getBoothWorkAssessmentList', eventId],
    () => getAssessmentList({ eventId, questionType: 2 }),
    {
      enabled: Boolean(eventId),
      onSuccess: ({ list }) => {
        dispatch({
          type: TYPE.LOAD_QUESTIONS,
          payload: list,
        });
      },
      refetchOnMount: true,
    },
  );

  // useEffect(() => {
  //   console.log('!!!', order?.assessmentResponseData);
  //   dispatch({
  //     type: TYPE.LOAD_QUESTIONS,
  //     payload: answerQuestions(boothQuestions, order.assessmentResponseData),
  //   });
  // }, [order?.assessmentResponseData, boothQuestions]);

  const activateStep = (id) =>
    dispatch({ type: TYPE.ACTIVATE, payload: { id } });

  const completeStep = (id, next, value) =>
    dispatch({
      type: TYPE.COMPLETE,
      payload: { id, next, value },
    });

  const updateState = (id, value) =>
    dispatch({ type: TYPE.UPDATE, payload: { id, value } });

  const setError = (err) => dispatch({ type: TYPE.ERROR, payload: err });

  const getProps = useCallback(
    (id, next) => ({
      active: id === state.activeStep,
      onEdit: () => activateStep(id),
      onContinue: (value) => completeStep(id, next, value),
      updateData: (value) => updateState(id, value),
      customerId,
      data: state[id],
      buttonText: state.buttonText,
    }),
    [state, customerId],
  );

  return (
    <Require shop>
      <Page variant="order" backTo={ROUTE.CATALOG} title="Checkout">
        <div className={styles.steps}>
          <BoothInfo data={state.boothInfo} />
          <BoothQuestions
            {...getProps(STEP.BOOTH_QUESTIONS, STEP.CONTACT)}
            isLoading={isLoadingQuestions}
            fetchQuestions={fetchQuestions}
            updateQuestions={updateQuestions}
          />
          <Contact {...getProps(STEP.CONTACT, STEP.PAYMENT)} />
          <Payment {...getProps(STEP.PAYMENT)} total={order?.totals?.total} />
        </div>

        {/* extra wrapper so "summary" can be "sticky" */}
        <div>
          <div className={styles.summary}>
            <Summary paymentMethod={state[STEP.PAYMENT][PAYMENT.METHOD]}>
              <PlaceOrder state={state} setError={setError} />
            </Summary>
          </div>
        </div>
      </Page>
    </Require>
  );
};

export default Checkout;
