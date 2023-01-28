import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { useQuery } from 'react-query';

import { useOrders, useCustomer, useShop } from 'app/context';
import { Require } from 'common/components';
import { ROUTE } from 'common/const';
import { Page } from 'common/site';
import { useEvent } from 'common/hooks';

import { STEP, PAYMENT } from '../const';
import { BoothInfo, BoothQuestions, Contact, Payment } from '../Steps';
import Summary from './Summary';
import PlaceOrder from './PlaceOrder';
import reducer, { init, TYPE } from './reducer';
import { getAssessmentQuestions } from 'data/events';

import styles from './Checkout.module.css';
import PrivateRoute from 'routes/PrivateRoute';

const FloorPlanBuilder = lazy(() => import('routes/floor-plan-builder'));

const Checkout = () => {
  const { eventId, ooSummaryId } = useShop();
  const { merchantId } = useEvent(eventId).data;
  const { customerId, ...customer } = useCustomer();

  const orders = useOrders();
  const order = useMemo(
    () => orders.findOrder(ooSummaryId),
    [orders, ooSummaryId],
  );

  const { response: boothType } = order?.assessmentResponseData?.find(
    ({ assessmentQ_ID }) => assessmentQ_ID === 2,
  ) || { response: 'blank' };
  const { response: boothLocation } = order?.assessmentResponseData?.find(
    ({ assessmentQ_ID }) => assessmentQ_ID === 3,
  ) || { response: 'blank' };

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

  useEffect(() => {
    dispatch({
      type: TYPE.LOAD_RESPONSES,
      payload: order?.assessmentResponseData ?? [],
    });
  }, [order?.assessmentResponseData]);

  const {
    refetch: fetchQuestions,
    isFetching: isLoadingQuestions,
    data: questions,
  } = useQuery(
    ['getBoothWorkAssessmentList', ooSummaryId],
    () =>
      getAssessmentQuestions({
        ooSummaryId,
        questionType: 2,
        boothType,
        boothLocation,
      }),
    {
      enabled: Boolean(ooSummaryId),
      cacheTime: 0,
      onSuccess: ({ list }) => {
        dispatch({
          type: TYPE.LOAD_QUESTIONS,
          payload: list,
        });
      },
      refetchOnMount: true,
    },
  );

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
      <PrivateRoute exact path={ROUTE.CHECKOUT + ROUTE.FLOOR_PLAN_BUILDER}>
        {console.log('floor plan builder')}
        <Page
          // variant="floorplan"
          backTo={ROUTE.CHECKOUT}
          title="Floor Plan Builder"
        >
          {/* <Suspense> */}
          <FloorPlanBuilder ooId={ooSummaryId} />
          {/* </Suspense> */}
        </Page>
      </PrivateRoute>

      <PrivateRoute exact path={ROUTE.CHECKOUT}>
        <Page variant="order" backTo={ROUTE.CATALOG} title="Checkout">
          <div className={styles.steps}>
            <BoothInfo data={state.boothInfo} />

            {/* Temporary fix to hide Booth Questions when there are none */}
            {isLoadingQuestions || questions?.list?.length ? (
              <BoothQuestions
                {...getProps(STEP.BOOTH_QUESTIONS, STEP.CONTACT)}
                isLoading={isLoadingQuestions}
                fetchQuestions={fetchQuestions}
              />
            ) : null}

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
      </PrivateRoute>
    </Require>
  );
};

export default Checkout;
