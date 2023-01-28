import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useMutation } from 'react-query';
import cx from 'classnames';

import { ROUTE, TEXT } from 'common/const';
import { Content, TextLink } from 'common/components';
import { Page } from 'common/site';
import { register } from 'data/customers';

import SignupAddress from './SignupAddress';
import SignupCredentials from './SignupCredentials';

import styles from './Signup.module.css';

const STEP = {
  CREDENTIALS: 'credentials',
  ADDRESS: 'address',
  SUBMIT: 'submit',
};

const Signup = () => {
  const [credentials, setCredentials] = useState({});
  const [address, setAddress] = useState({});
  const [step, setStep] = useState(STEP.CREDENTIALS);

  const {
    mutate,
    isLoading: isSubmitting,
    error,
    isSuccess,
  } = useMutation(register);

  useEffect(() => {
    if (step === STEP.SUBMIT) {
      mutate({
        ...credentials,
        ...address,
      });
    }
  }, [address, credentials, mutate, step]);

  return isSuccess ? (
    <Redirect to={ROUTE.LOGIN} />
  ) : (
    <Page
      variant="island"
      title={
        step === STEP.ADDRESS
          ? 'Enter Your Account Details'
          : 'Create an Account'
      }
    >
      <Content isLoading={isSubmitting} error={error?.message}>
        {/* If email and password is invalid show credentials page */}
        {step === STEP.CREDENTIALS && (
          // First page with the email and password
          <SignupCredentials
            onSubmit={(signupData) => {
              setCredentials(signupData);
              setStep(STEP.ADDRESS);
            }}
          />
        )}

        {step === STEP.ADDRESS && (
          // If login is not complete show account details page
          <SignupAddress
            onSubmit={(addressData) => {
              setAddress(addressData);
              setStep(STEP.SUBMIT);
            }}
          />
        )}

        <p className={cx(TEXT.BODY_1, styles.footer)}>
          Already have an account? <TextLink to={ROUTE.LOGIN}>Login</TextLink>
        </p>
      </Content>
    </Page>
  );
};

export default Signup;
