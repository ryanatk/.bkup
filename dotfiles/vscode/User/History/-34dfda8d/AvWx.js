import { useMemo } from 'react';
import { any, bool, func, object, string } from 'prop-types';
import cx from 'classnames';

import { TEXT, VALID } from 'common/const';
import {
  // StateInput,
  Input,
  SubmitButton,
  Form,
  CountryInput,
} from 'common/components';
import { useAddress } from 'common/hooks';

import styles from './AddressForm.module.css';

const AddressForm = ({
  buttonText,
  defaultValues: values,
  isSubmitting,
  onSubmit,
  children,
}) => {
  // console.log('<AddressForm>', { buttonText, defaultValues, isSubmitting });

  const {
    countries,
    countryCode,
    // states,
    updateCountry,
    // FIELD,
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
        phone: VALID.PHONE_NUMBER.required('Office phone number is required'),
        company: VALID.STRING.required('Company name is required'),
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
      <p className={cx(TEXT.BODY_2, styles.subheading)}>
        <sup>*</sup>Required information
      </p>

      <ol>
        <li className={styles.line}>
          <Input name="firstName" label="First Name *" required />
          <Input name="lastName" label="Last Name *" required />
        </li>

        <li>
          <Input
            name="mobile"
            label="Mobile Number (optional)"
            required={false}
          />
        </li>

        <li>
          <Input name="company" label="Company Name *" required />
        </li>

        <li>
          <Input
            name="phone"
            label="Office Phone Number *"
            maxlength={25}
            required
          />
        </li>

        <li>
          <CountryInput
            label="Country / Region (optional)"
            name="countryCode"
            options={countries}
            defaultValue={countryCode}
            onChange={updateCountry}
          />
        </li>
      </ol>

      <ol className={cx(STYLE.address)}>
        <AddressItem name="address1" required={false} />
        <AddressItem
          name="address2"
          label="Apartment, suite, unit"
          required={false}
        />
        <AddressItem name="city" label="City" required={false} />

        <AddressItem name="state" helperText="Abbreviated form (Ex. NV)" />
        {/* {FIELD.state && (
          <li className={STYLE.state}>
            <StateInput
              name="state"
              label={`${FIELD.state?.label} (optional)`}
              placeholder={FIELD.state?.placeholder}
              options={states}
              defaultValue={defaultValues.state}
              required={false}
            />
          </li>
        )} */}

        <AddressItem name="zip" label="Zip Code" required={false} />
      </ol>

      {children}

      <SubmitButton name="submit" fullWidth>
        {buttonText}
      </SubmitButton>
    </Form>
  );
};

AddressForm.propTypes = {
  buttonText: string,
  defaultValues: object,
  isSubmitting: bool,
  onSubmit: func,
  children: any,
};

AddressForm.defaultProps = {
  buttonText: 'Submit',
  defaultValues: {},
};

export default AddressForm;
