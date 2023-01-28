import { useState } from 'react';

import { useCustomer } from 'app/context';
import { VALID } from 'common/const';
import { Button, Content, Form, Input, SubmitButton } from 'common/components';

import SectionHeader from '../SectionHeader';

import styles from './PhoneNumber.module.css';

const PhoneNumber = ({ phoneType, defaultValue }) => {
  const customer = useCustomer();
  const [active, setActive] = useState(false);

  return active ? (
    <Content isLoading={customer.isUpdating}>
      <Form
        validation={{
          phone: VALID.PHONE_NUMBER.required('Phone number is required'),
        }}
        onPass={({ phone }) => {
          customer.changePhone({ address: { ...customer }, phone, phoneType });
        }}
        onFail={(errors) => {
          // console.error({ errors });
        }}
        isSubmitting={customer.isUpdating}
        defaultValues={{
          phone: defaultValue,
        }}
      >
        <SectionHeader el="legend">Edit {phoneType} Number</SectionHeader>

        <fieldset className={styles.fieldset}>
          <Input name="phone" label={`${phoneType} Number`} required />
        </fieldset>

        <div className={styles.actions}>
          <SubmitButton name="submit" isSubmitting={customer.isUpdating}>
            Update
          </SubmitButton>
          <Button text name="cancel" onClick={() => setActive(false)}>
            Cancel
          </Button>
        </div>
      </Form>
    </Content>
  ) : (
    <Content isLoading={customer.isUpdating}>
      <SectionHeader action={{ onClick: () => setActive(true) }}>
        {phoneType} Number
      </SectionHeader>

      <p>{defaultValue}</p>
    </Content>
  );
};

export default PhoneNumber;
