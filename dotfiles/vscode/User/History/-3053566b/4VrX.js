import { useMemo } from 'react';
import cx from 'classnames';
import { useHistory, useParams } from 'react-router';
import { useQuery } from 'react-query';

import { useCustomer, useOrders } from 'app/context';
import { COLOR, CREDIT_CARD, ROUTE, TEXT } from 'common/const';
import {
  AddressDisplay,
  BoothSetup,
  Button,
  Content,
  EventDates,
  OrderSummary,
  PaymentMethod,
  ProductList,
  Requirement,
  UploadFloorPlan,
} from 'common/components';
import { Page } from 'common/site';
import { useEvent } from 'common/hooks';
import { date, DATE_FORMAT, getBoothSetup } from 'common/utils';

import { COMPLETED, INCOMPLETE } from '../const';
import {
  SectionCard,
  DeleteOrder,
  OrderItem,
  ResumeOrder,
  SectionTitle,
} from '../components';

import styles from './OrderDetails.module.css';
import { getEventCatalogCategoryNames } from 'data/events';

const OrderDetails = () => {
  const { customerId } = useCustomer();
  const history = useHistory();
  const { id } = useParams();
  const { isLoading, error, findOrder } = useOrders();

  const order = useMemo(() => findOrder(id) ?? {}, [findOrder, id]);
  const booth = useMemo(() => getBoothSetup(order), [order]);
  const personal = order?.personalInformation ?? {};
  const billing = order?.personalInformation?.addressInformation ?? {};
  const { eventId, id: ooId, boothLocation, boothType } = order;

  const { DATE_LABEL } = useMemo(
    () => (order.isCompleted ? COMPLETED : INCOMPLETE),
    [order.isCompleted],
  );

  const event = useEvent(eventId);

  const card = useMemo(() => {
    return Object.values(CREDIT_CARD).find(
      ({ db }) => db === order.payment?.type,
    );
  }, [order.payment?.type]);

  const categoryNames = useQuery(
    ['getEventCatalogCategoryNames', { eventId, ooId }],
    () =>
      getEventCatalogCategoryNames({
        eventId,
        ooId,
        boothType,
        boothLocation,
      }),
    {
      enabled: Boolean(eventId) && Boolean(ooId),
      cacheTime: 0,
    },
  );

  return (
    <Page variant="order" title="Order Details">
      <div className={styles.header}>
        <Button
          text
          onClick={() => history.push(ROUTE.ORDERS)}
          startIcon="caret-left"
          size="small"
        >
          Back
        </Button>

        <h1 className={cx(TEXT.H4, styles.title)}>Order Details</h1>

        <p className={cx(COLOR.GREY_200, TEXT.BODY_2)}>
          <span className={cx(COLOR.TEXT)}>
            {DATE_LABEL}: {date(order.date).format(DATE_FORMAT.MEDIUM_DATE)}
          </span>
        </p>

        {order.isCompleted && (
          <p className={cx(COLOR.GREY_200, TEXT.BODY_2)}>
            <span className={cx(COLOR.TEXT)}>Order ID: {order.id}</span>
          </p>
        )}
        {/* TODO: invoice number, when it's in the data */}
      </div>

      <div className={styles.actions}>
        {!isLoading &&
          (order.isCompleted ? (
            <Button
              className={styles.action}
              href={`${ROUTE.ORDER_INVOICE}/${order.id}`}
            >
              View Statement
            </Button>
          ) : (
            <ResumeOrder className={styles.action} order={order} />
          ))}
      </div>

      <Content error={error} isLoading={isLoading}>
        <SectionCard title="Order Summary" className={styles.summary}>
          {order.isCompleted ? (
            <>
              <div className={styles.section}>
                {order.totals && (
                  <OrderSummary
                    totals={order.totals}
                    paymentMethod={order.payment?.method}
                    eventId={order.eventId}
                  />
                )}
              </div>

              <div className={styles.section}>
                <SectionTitle>Payment</SectionTitle>
                <PaymentMethod
                  last4={order.payment?.last4}
                  card={card}
                  method={order.payment?.method}
                />
              </div>
            </>
          ) : (
            <p className={COLOR.GREY_600}>{INCOMPLETE.MESSAGE}</p>
          )}
        </SectionCard>

        <div className={styles.details}>
          <SectionCard title={order.eventName}>
            <div className={styles.primary}>
              <Content
                isLoading={event.isLoading}
                error={event?.error?.message}
              >
                <ol>
                  <li>
                    <EventDates
                      start={event.data.dateStart}
                      end={event.data.dateEnd}
                    />
                  </li>
                  <li>{event.data.facilityName}</li>
                  <li>{event.data.facilityLocation}</li>
                </ol>
              </Content>
            </div>

            <div className={styles.secondary}>
              <section className={styles.section}>
                <SectionTitle>Booth Setup</SectionTitle>
                <BoothSetup booth={booth} showNumber={true} inline />
              </section>

              <section className={styles.section}>
                <SectionTitle>Booth Work</SectionTitle>
                {order.isCompleted ? (
                  <ul>
                    {order.assessmentResponseData.map(
                      ({ assessmentQ_ID, response, question }) => {
                        return assessmentQ_ID > 4 ? (
                          <li
                            key={assessmentQ_ID}
                            className={styles.requirement}
                          >
                            <Requirement
                              textFont={TEXT.BODY_1}
                              isMet={response === 'Yes'}
                            >
                              {question}
                            </Requirement>
                          </li>
                        ) : null;
                      },
                    )}
                    <UploadFloorPlan
                      exists={order.floorPlanExists}
                      customerId={customerId}
                      eventId={order.eventId}
                      ooId={order.id}
                    />
                  </ul>
                ) : (
                  <p className={COLOR.GREY_600}>{INCOMPLETE.MESSAGE}</p>
                )}
              </section>
            </div>
          </SectionCard>

          {order.isCompleted && (
            <SectionCard>
              <div className={styles.secondary}>
                <section className={styles.section}>
                  <SectionTitle>Personal Information</SectionTitle>
                  <p>
                    {personal.firstName} {personal.lastName}
                  </p>
                  <p className={styles.data}>{personal.email}</p>
                  <p className={styles.data}>{personal.mobile}</p>
                </section>

                <section className={styles.section}>
                  <SectionTitle>
                    {order.companyInformation.name} Information
                  </SectionTitle>
                  <p>{billing.name}</p>
                  <AddressDisplay address={billing} />
                  <p>{billing.phone}</p>
                </section>

                {order.isThirdParty && (
                  <section className={styles.section}>
                    <SectionTitle>Exhibitor Information</SectionTitle>
                    <p>{order.thirdPartyCompanyName}</p>
                  </section>
                )}
              </div>
            </SectionCard>
          )}

          <SectionCard>
            <section>
              <SectionTitle>Your Items</SectionTitle>
              {console.log(order.items?.length, categoryNames)}
              {order.items?.length && categoryNames ? (
                <Content
                  isLoading={categoryNames.isLoading}
                  error={categoryNames.error?.message}
                >
                  <ProductList
                    categories={categoryNames.data}
                    items={order.items}
                    renderItem={(item) => (
                      <OrderItem item={item} variant="order" />
                    )}
                  />
                </Content>
              ) : (
                <p className={COLOR.GREY_600}>{INCOMPLETE.ITEMS_MESSAGE}</p>
              )}
            </section>
          </SectionCard>

          {!order.isCompleted && order.id && (
            <div className={styles.delete}>
              <DeleteOrder
                id={order.id}
                onSuccess={() => history.push(ROUTE.ORDERS)}
              />
            </div>
          )}
        </div>
      </Content>
    </Page>
  );
};

export default OrderDetails;
