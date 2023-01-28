import { useCallback, useMemo, useState } from 'react';
import { func, object, string } from 'prop-types';
import { useMutation } from 'react-query';
import cx from 'classnames';

import { useShop } from 'app/context';
import { ADDRESS_TYPE, COLOR, TEXT } from 'common/const';
import {
  AddressDisplay,
  ContactForm,
  Content,
  Error,
  Input,
  OptionButton,
} from 'common/components';
import { addAddress } from 'data/orders';

import withStep from './withStep';

import styles from './Contact.module.css';

const THIRD_PARTY_QUESTION =
  'Are you a Third-Party Contractor representing an exhibitor and/or company?';

const Heading = ({ className, children }) => (
  <h6 className={cx(TEXT.SUBTITLE, className)}>{children}</h6>
);

const Display = ({ data: customer }) => {
  // console.log('<Contact.Display>', { customer });

  const address = useMemo(
    () => ({
      address1: customer.address1,
      address2: customer.address2,
      city: customer.city,
      state: customer.state,
      zip: customer.zip,
      countryCode: customer.countryCode,
      phone: customer.phone,
    }),
    [customer],
  );

  return (
    <Content isLoading={customer.isUpdating} error={customer.error}>
      {customer.isThirdParty && (
        <section className={styles.section}>
          <h6>{THIRD_PARTY_QUESTION}</h6>
          <p className={cx(TEXT.BOLD)}>{customer.isThirdParty}</p>
        </section>
      )}

      {customer.exhibitorInfo && (
        <section className={styles.section}>
          <Heading>Exhibitor Information</Heading>
          <p>{customer.exhibitorInfo}</p>
        </section>
      )}

      {(customer.firstName ||
        customer.lastName ||
        customer.email ||
        customer.phone) && (
        <section className={styles.section}>
          <Heading>Personal Information</Heading>
          <ol>
            <li>
              {customer.firstName} {customer.lastName}
            </li>
            <li>{customer.mobile}</li>
          </ol>
        </section>
      )}

      {(customer.company ||
        Object.values(address).some((val) => Boolean(val))) && (
        <section className={styles.section}>
          <Heading>{customer.company} Information</Heading>
          <AddressDisplay address={address} displayPhone={true} />
        </section>
      )}
    </Content>
  );
};

Display.propTypes = {
  data: object,
};

const INIT_STATE = {
  isThirdParty: undefined,
  exhibitorInfo: undefined,
  error: undefined,
};

const ANSWER = {
  YES: 'Yes',
  NO: 'No',
};

const Edit = ({ buttonText, customerId, data, onContinue }) => {
  const shop = useShop();
  const [state, setState] = useState({
    ...INIT_STATE,
    isThirdParty: data.isThirdParty,
    exhibitorInfo: data.exhibitorInfo,
    error: data.error,
  });
  const {
    mutate: submit,
    isLoading: isSubmitting,
    error,
  } = useMutation(addAddress, {
    onSuccess: (data) => {
      // console.log({ data });
      onContinue({ ...data, ...state });
    },
  });

  const handleSubmit = useCallback(
    (address) => {
      const { isThirdParty, exhibitorInfo } = state;
      const shouldSubmit =
        (isThirdParty && exhibitorInfo) || isThirdParty === ANSWER.NO;

      if (shouldSubmit) {
        submit({
          ooId: shop.ooSummaryId,
          type: ADDRESS_TYPE.COMPANY,
          address,
          customerId,
          exhibitorInfo,
        });
      } else {
        setState((data) => ({
          ...data,
          error:
            isThirdParty === ANSWER.YES
              ? 'Please enter Exhibitor Info.'
              : 'Please select an answer.',
        }));
      }
    },
    [customerId, state, submit, shop],
  );

  return (
    <>
      {error && <Error>{error.message}</Error>}

      <ContactForm
        defaultValues={data}
        onSubmit={handleSubmit}
        buttonText={buttonText}
        isSubmitting={isSubmitting}
      >
        <fieldset className={styles.section}>
          <legend className={TEXT.SUBTITLE}>{THIRD_PARTY_QUESTION} *</legend>
          <p className={cx(TEXT.CAPTION, styles.subtext)}>
            We will not contact the Exhibitor directly.
          </p>

          {state.error && !state.isThirdParty && (
            <p className={cx(COLOR.ERROR, styles.subtext)}>{state.error}</p>
          )}

          <div className={styles.buttons}>
            {Object.values(ANSWER).map((value) => (
              <OptionButton
                value={value}
                selected={value === state.isThirdParty}
                key={value}
                label={value}
                onClick={(isThirdParty) => {
                  setState({
                    ...INIT_STATE,
                    isThirdParty,
                  });
                }}
                className={styles.option}
              />
            ))}
          </div>

          {!state.isThirdParty && (
            <p className={styles.subtext}>Select an answer.</p>
          )}

          {state.isThirdParty === ANSWER.YES && (
            <>
              <Heading className={styles.exhibitor}>
                Exhibitor Information
              </Heading>
              <Input
                error={state.error}
                label="Company Name"
                name="exhibitor-info"
                defaultValue={state.exhibitorInfo}
                onChange={({ target }) =>
                  setState((data) => ({
                    ...data,
                    error: undefined,
                    exhibitorInfo: target.value,
                  }))
                }
              />
            </>
          )}
        </fieldset>
      </ContactForm>
    </>
  );
};

Edit.propTypes = {
  buttonText: string,
  customerId: string.isRequired,
  data: object,
  onContinue: func,
};

export default withStep(Display, Edit, 'Contact');
