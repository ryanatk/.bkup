import { useEffect, useMemo } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import cx from 'classnames';

import { ROUTE, TEXT, VALID } from 'common/const';
import {
  Alert,
  Checkbox,
  Error,
  Form,
  Input,
  Password,
  SubmitButton,
  TextLink,
} from 'common/components';
import { Page } from 'common/site';
import { authenticate } from 'data/customers';
import { useAuth } from 'app/context';
import { useSearchParams } from 'common/hooks';

import styles from './Login.module.css';

const EMAIL = 'emailAddress';
const REMEMBER = 'rememberEmail';

const Login = () => {
  const { customerId, login } = useAuth();
  const history = useHistory();
  const {
    mutate: submitLogin,
    error,
    isLoading: isSubmitting,
  } = useMutation(authenticate, {
    onSuccess: (data) => login(data),
  });

  // Get the query parameter for the redirect
  const nextRoute = useSearchParams().redirect ?? ROUTE.DASHBOARD;

  const remember = useMemo(
    () => sessionStorage.getItem(REMEMBER) !== 'false',
    [],
  );
  const email = useMemo(
    () => (remember ? localStorage.getItem(EMAIL) : undefined),
    [remember],
  );

  const handleSubmit = async ({ email, password, remember }) => {
    // console.log('!Login.handleSubmit', { email, password, remember });

    sessionStorage.setItem(REMEMBER, remember);

    if (remember) {
      localStorage.setItem(EMAIL, email);
    } else {
      localStorage.removeItem(EMAIL);
    }

    submitLogin({ email, password });
  };

  // handle success (after context updates)
  useEffect(() => {
    if (customerId) {
      history.push(nextRoute);
    }
  }, [customerId, history, nextRoute]);

  return (
    <Page variant="island" title="Log into Online Ordering">
      <Alert>
        <div className={styles.alert}>
          <p className={styles.p}>
            Welcome to Edlen's new Online Ordering system!
          </p>
          <p className={styles.p}>All users must create a new account.</p>
          <p className={styles.p}>Sign up to get started.</p>
        </div>
      </Alert>

      <Form
        defaultValues={{
          email,
        }}
        validation={{
          email: VALID.EMAIL.required('Please enter your email.'),
          password: VALID.PASSWORD.required('Please enter your password.'),
        }}
        onPass={(data) => {
          handleSubmit(data);
        }}
        onFail={(errors) => {
          // console.log(errors);
        }}
        isSubmitting={isSubmitting}
      >
        {error && (
          <div className={styles.error}>
            <Error>{error?.message}</Error>
          </div>
        )}

        <Input name="email" />
        <Password name="password" />

        <div className={cx(TEXT.BODY_1, styles.group)}>
          <Checkbox
            name="remember"
            label="Save email"
            defaultChecked={remember}
          />
          <TextLink to={ROUTE.FORGOT_PASSWORD}>Forgot Password</TextLink>
        </div>

        <SubmitButton
          className={styles.button}
          name="submit"
          fullWidth
          isSubmitting={isSubmitting}
          track={['Login', 'Submit']}
        >
          Login
        </SubmitButton>

        <p className={cx(TEXT.BODY_1, styles.footer)}>
          New to Online Ordering? <TextLink to={ROUTE.SIGNUP}>Sign Up</TextLink>
        </p>
      </Form>
    </Page>
  );
};

export default Login;
