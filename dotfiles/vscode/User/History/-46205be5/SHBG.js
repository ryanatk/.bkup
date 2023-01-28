import { useMemo } from 'react';
import { any, bool, func, object, string } from 'prop-types';
import cx from 'classnames';

import { TEXT, VALID } from 'common/const';
import { CountryInput, Form, Input, SubmitButton } from 'common/components';
import { useAddress } from 'common/hooks';

import styles from './ContactForm.module.css';

const ContactForm = ({
  buttonText,
  defaultValues: values,
  isSubmitting,
  onSubmit,
  children,
}) => {
  // console.log('<ContactForm>', { buttonText, defaultValues, isSubmitting });

  const {
    countries,
    countryCode,
    // states,
    updateCountry,
    FIELD,
    STYLE,
    AddressItem,
  } = useAddress(values);

  const defaultValues = useMemo(
    () => ({ ...values, countryCode }),
    [values, countryCode],
  );

  return (
    <Form
      validation={{
        firstName: VALID.FIRST_NAME.required('First name is required'),
        lastName: VALID.LAST_NAME.required('Last name is required'),
        mobile: VALID.PHONE_NUMBER.required('Mobile number is required'),
        countryCode: VALID.COUNTRY.required('Country / Region is required'),
        address1: FIELD.address1?.validation,
        address2: FIELD.address2?.validation,
        city: FIELD.city?.validation,
        state: FIELD.state?.validation,
        zip: FIELD.zip?.validation,
        phone: VALID.PHONE_NUMBER.required('Phone number is required'),
      }}
      onPass={(data) => {
        onSubmit(data);
      }}
      onFail={(errors) => {
        // console.error({ errors });
      }}
      isSubmitting={isSubmitting}
      defaultValues={defaultValues}
    >
      {children}

      <fieldset className={styles.fieldset}>
        <legend className={cx(TEXT.SUBTITLE_1, styles.legend)}>
          Personal Information
        </legend>

        <ol>
          <li className={styles.line}>
            <Input name="firstName" label="First Name" required />
            <Input name="lastName" label="Last Name" required />
          </li>

          <li className={styles.line}>
            <Input
              name="mobile"
              label="Mobile Number"
              maxlength={25}
              required
            />
          </li>
        </ol>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={cx(TEXT.SUBTITLE_1, styles.legend)}>
          {defaultValues.company} Information
        </legend>

        <ol>
          <li>
            <CountryInput
              label="Country / Region"
              name="countryCode"
              options={countries}
              defaultValue={countryCode}
              onChange={updateCountry}
              required
            />
          </li>
        </ol>

        <ol className={cx(STYLE.address)}>
          <AddressItem name="address1" />
          <AddressItem name="address2" />
          <AddressItem name="city" />
          <AddressItem name="state" />
          <AddressItem name="zip" />
        </ol>
        <ol>
          <li>
            <Input
              name="phone"
              label="Office Phone Number"
              maxlength={25}
              required
            />
          </li>
        </ol>
      </fieldset>

      <div className={styles.submit}>
        <SubmitButton name="submit" isSubmitting={isSubmitting}>
          {buttonText}
        </SubmitButton>
      </div>
    </Form>
  );
};

ContactForm.propTypes = {
  defaultValues: object,
  isSubmitting: bool,
  onSubmit: func,
  buttonText: string,
  children: any,
};

ContactForm.defaultProps = {
  buttonText: 'Submit',
  defaultValues: {},
};

export default ContactForm;
