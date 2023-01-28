import { useMemo } from 'react';
import cx from 'classnames';
import { useParams } from 'react-router';

import { useOrders } from 'app/context';
import { COLOR, CREDIT_CARD, TEXT } from 'common/const';
import {
  AddressDisplay,
  BoothSetup,
  Content,
  EventDates,
  OrderSummary,
  PaymentMethod,
  ProductList,
  Requirement,
} from 'common/components';
import { useEvent } from 'common/hooks';
import { date, DATE_FORMAT, getBoothSetup } from 'common/utils';

import { COMPLETED } from '../const';
import { OrderItem, SectionTitle } from '../components';

import styles from './OrderInvoice.module.css';
import { Page } from 'common/site';

const { DATE_LABEL } = COMPLETED;

const OrderInvoice = () => {
  const { id } = useParams();
  const { isLoading, error, findOrder } = useOrders();

  const { billing, personal, boothSetup, ...order } = useMemo(() => {
    const order = findOrder(id) ?? {};
    const personal = order?.personalInformation ?? {};
    const billing = order?.personalInformation?.addressInformation ?? {};
    const boothSetup = getBoothSetup(order);

    return {
      ...order,
      billing,
      personal,
      boothSetup,
    };
  }, [findOrder, id]);

  const boothWork = useMemo(
    () =>
      order.assessmentResponseData?.filter(
        ({ assessmentQ_ID: id }) => id > 4,
      ) ?? [],
    [order.assessmentResponseData],
  );

  const { data: event, isLoading: isEventLoading } = useEvent(order.eventId);

  const card = useMemo(() => {
    return Object.values(CREDIT_CARD).find(
      ({ db }) => db === order.payment?.type,
    );
  }, [order.payment?.type]);

  return (
    <Page variant="print" className={TEXT.BODY_2} title="Order Statement">
      <Content error={error} isLoading={isLoading || isEventLoading}>
        <header className={styles.section}>
          <h1 className={cx(TEXT.H4, styles.title)}>Order Statement</h1>

          <ul className={styles.details}>
            <li>
              {DATE_LABEL}: {date(order.date).format(DATE_FORMAT.MEDIUM_DATE)}
            </li>

            <li>Order ID: {order.id}</li>
            {/* TODO: invoice number, when it's in the data */}
          </ul>
        </header>

        <div className={styles.details}>
          <div className={styles.section}>
            <SectionTitle>Payment</SectionTitle>
            <PaymentMethod
              method={order.payment?.method}
              last4={order.payment?.last4}
              card={card}
            />
          </div>

          <div className={styles.section}>
            {order.totals && (
              <OrderSummary
                totals={order.totals}
                paymentMethod={order.payment?.method}
                eventId={order.eventId}
                showBalance={true}
                amountPaid={order.payment?.amountPaid}
              />
            )}
          </div>
        </div>

        <div className={styles.details}>
          <section className={styles.section}>
            <div className={styles.section}>
              <SectionTitle>{order.eventName}</SectionTitle>
              <ol>
                <li>
                  <EventDates start={event.dateStart} end={event.dateEnd} />
                </li>
                <li>{event.facilityName}</li>
                <li>{event.facilityLocation}</li>
              </ol>
            </div>

            <div className={styles.section}>
              <SectionTitle>Booth Setup</SectionTitle>
              <BoothSetup booth={boothSetup} showNumber />
            </div>
          </section>

          {boothWork.length ? (
            <section className={styles.section}>
              <SectionTitle>Booth Work</SectionTitle>
              <ul>
                {boothWork.map(({ assessmentQ_ID, response, question }) => (
                  <li key={assessmentQ_ID} className={styles.requirement}>
                    <Requirement
                      textFont={TEXT.BODY_1}
                      isMet={response === 'Yes'}
                    >
                      {question}
                    </Requirement>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <div className={styles.details}>
          <div className={styles.section}>
            <section className={styles.section}>
              <SectionTitle>Personal Information</SectionTitle>
              <p>
                {personal.firstName} {personal.lastName}
              </p>
              <p>{personal.email}</p>
              <p>{personal.phone}</p>
            </section>

            {order.isThirdParty && (
              <section>
                <SectionTitle>Exhibitor Information</SectionTitle>
                <p>{order.thirdPartyCompanyName}</p>
              </section>
            )}
          </div>

          <section className={styles.section}>
            <SectionTitle>Company Information</SectionTitle>
            <p>{billing.name}</p>
            <AddressDisplay address={billing.address} />
            <p>{billing.phone}</p>
          </section>
        </div>

        <section className={cx(styles.section)}>
          <SectionTitle>Your Items</SectionTitle>
          <ProductList
            items={order.items}
            renderItem={(item) => <OrderItem item={item} variant="invoice" />}
          />
        </section>

        <section className={styles.section}>
          <SectionTitle>Branch Information</SectionTitle>
          <div className={styles.details}>
            <ul>
              <li>{event.branchInfo?.name}</li>
              <li>{event.branchInfo?.email}</li>
            </ul>
            <AddressDisplay address={event.branchInfo} displayPhone />
          </div>
        </section>

        <p className={cx(COLOR.TEXT_SECONDARY, styles.disclaimer)}>
          This is an account summary/order confirmation and is not a final
          invoice. This statement is subject to change based upon services
          rendered.
        </p>
      </Content>
    </Page>
  );
};

export default OrderInvoice;
