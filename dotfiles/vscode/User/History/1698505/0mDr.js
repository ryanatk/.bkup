import { createRef, forwardRef, useState } from 'react';
import { func, object, string } from 'prop-types';
import { useMutation } from 'react-query';
import { v4 } from 'uuid';

import { useShop } from 'app/context';

import {
  Accordion,
  AccordionGroup,
  Button,
  Content,
  CreditCardInfo,
  PaymentForm,
  PaymentMethod,
  TransferInfo,
} from 'common/components';
import { ADDRESS_TYPE, CREDIT_CARD, PAYMENT_METHOD } from 'common/const';
import { remoteSubmit } from 'common/utils';

import { addAddress } from 'data/orders';

import useEventPaymentMethods from './useEventPaymentMethods';
import withStep from './withStep';
import { PAYMENT } from '../const';

import styles from './Payment.module.css';

const Display = ({ data }) => {
  // console.log('<Payment.Display>', { data });

  const method = data[PAYMENT.METHOD];
  const cardNumber = (data[PAYMENT.ACCOUNT_NUMBER] ?? '').replace(/ /g, '');
  const card = Object.values(CREDIT_CARD).find(({ firstDigit }) =>
    firstDigit.find((digit) => Number(cardNumber.charAt(0)) === Number(digit)),
  );
  const last4 = cardNumber.substring(cardNumber.length - 4);

  return (
    cardNumber && <PaymentMethod method={method} card={card} last4={last4} />
  );
};

Display.propTypes = {
  data: object,
};

// EDIT
const { CARD, ACH, WIRE } = PAYMENT_METHOD;
const DEFAULT_METHOD = CARD;
const UUID = v4();

const Edit = ({ buttonText, customerId, data, onContinue, total }) => {
  const guaranteeAlert =
    total === 0
      ? 'A credit card is required as a guarantee and will not process.'
      : undefined;

  const {
    shouldDisplayPaymentMethod,
    error: eventPaymentError,
    totalsError,
    maxAlert,
    isLoading: isLoadingMethods,
  } = useEventPaymentMethods();
  const { ooSummaryId } = useShop();

  const {
    mutate: submit,
    isLoading: isSubmitting,
    error: addAddressError,
  } = useMutation(addAddress, {
    onSuccess: (data) => onContinue(data),
  });

  const ref = {
    [CARD]: createRef(),
    [ACH]: createRef(),
    [WIRE]: createRef(),
  };
  const [method, setMethod] = useState(data[PAYMENT.METHOD] ?? DEFAULT_METHOD);
  const handleContinue = (form) => remoteSubmit(form.current);

  const Form = forwardRef((props, ref) => (
    <PaymentForm
      defaultValues={data}
      onSubmit={async (address) => {
        submit({
          ooId: ooSummaryId,
          type: ADDRESS_TYPE.BILLING,
          address: { ...address, [PAYMENT.METHOD]: method },
          customerId,
        });
      }}
      buttonText={null} // hide the form's button
      isSubmitting={isSubmitting}
      ref={ref}
    />
  ));

  return (
    <Content
      isLoading={isLoadingMethods}
      error={
        addAddressError?.message ||
        eventPaymentError?.message ||
        totalsError?.message
      }
      notification={guaranteeAlert || maxAlert}
    >
      <AccordionGroup
        radios
        defaultActive={method + UUID}
        onChange={(id) => setMethod(id.replace(UUID, ''))}
      >
        {shouldDisplayPaymentMethod(PAYMENT_METHOD.CARD) && (
          <Accordion
            id={CARD + UUID}
            summary={
              <div>
                <h4 className={styles.summary}>Credit Card</h4>
                <CreditCardInfo />
              </div>
            }
          >
            <Form ref={ref[CARD]} />
          </Accordion>
        )}

        {shouldDisplayPaymentMethod(PAYMENT_METHOD.ACH) && (
          <Accordion id={ACH + UUID} summary="ACH Transfer">
            <TransferInfo transferType={PAYMENT_METHOD.ACH} />
            <Form ref={ref[ACH]} />
          </Accordion>
        )}

        {shouldDisplayPaymentMethod(PAYMENT_METHOD.WIRE) && (
          <Accordion id={WIRE + UUID} summary="Wire Transfer ($50 Fee)">
            <TransferInfo transferType={PAYMENT_METHOD.WIRE} />
            <Form ref={ref[WIRE]} />
          </Accordion>
        )}
      </AccordionGroup>

      <div className={styles.continue}>
        <Button onClick={() => handleContinue(ref[method])}>
          {buttonText}
        </Button>
      </div>
    </Content>
  );
};

Edit.propTypes = {
  buttonText: string,
  customerId: string.isRequired,
  data: object,
  onContinue: func,
};

export default withStep(Display, Edit, 'Payment');
