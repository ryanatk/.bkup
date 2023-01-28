import { useFormik } from 'formik';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import * as Yup from 'yup';
import {
  Alert,
  BodyLink,
  Box,
  DeprecatedButton,
  Footer,
  FormikInput,
  Header,
  PageContainer,
  Typography,
} from '../../components/sormus';
import { myAccount } from '../../data-mock/page-details/my-account';
import { t } from '../../public/locales/LocaleContext';
import API from '../../utils/api';
import logToDatadog from '../../utils/logToDatadog';
import {
  metricError,
  metricRequest,
  metricSuccess,
} from '../../utils/reportMetrics';

const getFormValidationSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .trim()
      .required(() => t('checkout_form_emailrequired'))
      .email(() => t('checkout_form_emailformat'))
      .max(40, () => t('checkout_form_40characters')),
  });
};

type CheckStatusOptions = '' | 'success' | 'error';

const CHECK_STATUS_ERROR = 'error';
const CHECK_STATUS_SUCCESS = 'success';
const CHECK_EMAIL_METRIC_NAME = 'ecom.web.my_account.check_email';

const MyAccount = () => {
  const [checkStatus, setCheckStatus] = useState<CheckStatusOptions>('');
  const [loading, setLoading] = useState(false);
  const { formatMessage } = useIntl();

  const handleSubmit = async (payload) => {
    metricRequest(CHECK_EMAIL_METRIC_NAME);
    const response = await API.post('/api/my-order/check-email', payload);
    if (!response || response >= 400 || response.error) {
      setCheckStatus(CHECK_STATUS_ERROR);
      metricError(CHECK_EMAIL_METRIC_NAME, { ...response });
      logToDatadog('my_account', `Error checking order on "My Account".`, {
        response,
      });
      return;
    }

    if (response === 200) {
      setCheckStatus(CHECK_STATUS_SUCCESS);
      metricSuccess(CHECK_EMAIL_METRIC_NAME, { ...response });
    }

    setLoading(false);
  };

  const handleResetForm = () => {
    setCheckStatus('');
    setLoading(false);
    myAccountFormik.resetForm();
  };

  const myAccountFormik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: getFormValidationSchema,
    initialValues: {
      email: '',
    },
    onSubmit: (values) => {
      setLoading(true);
      handleSubmit({ email: values.email });
    },
  });

  // ECOM-19 only show the check email message to prevent bad actors from using it to harvest customer email addresses from it
  let statusMessage;
  if (checkStatus === CHECK_STATUS_ERROR) {
    statusMessage = t('my_account_email_error');
  } else {
    statusMessage = t('my_account_email_success');
  }

  return (
    <div className="tailwind">
      <NextSeo {...myAccount.seoParams} />
      <Header showCart={false} hideLinks={true} shopButton={false} />
      <PageContainer name="my-account">
        <Box className="flex flex-col items-center">
          <Typography className="text-5xl font-light">
            {t('footer_my_account')}
          </Typography>
          <Typography
            className="text-xl font-light pt-6 leading-10"
            align="center"
          >
            {t('my_account_enter_email')}
          </Typography>
          <Typography className="text-base font-light" align="center">
            {t('my_account_find_your_email')}
          </Typography>
          {checkStatus ? (
            <>
              {checkStatus === CHECK_STATUS_ERROR ? (
                <Alert
                  className="my-8"
                  data-cy="alert-fail"
                  severity="error"
                  text={statusMessage}
                />
              ) : (
                <Alert
                  className="mt-8"
                  data-cy="alert-success"
                  severity="success"
                  text={statusMessage}
                />
              )}
              <DeprecatedButton
                data-cy="button-reset-form"
                width={300}
                onClick={handleResetForm}
                text={formatMessage({ id: 'my_account_another_email' })}
                className="mt-8"
              />
            </>
          ) : (
            <form
              className="max-w-md mt-8 w-full flex flex-col items-center"
              onSubmit={myAccountFormik.handleSubmit}
            >
              <FormikInput
                field="email"
                formik={myAccountFormik}
                label={formatMessage({ id: 'my_account_email' })}
                className="pb-3"
              />
              <DeprecatedButton
                data-cy="button-submit"
                type="submit"
                loading={loading}
                width={326}
                onClick={() => {}}
                text={formatMessage({ id: 'submit' })}
                className="mt-8 h-16"
                variant="filled"
              />
            </form>
          )}
          <div className="mt-16">
            <Typography className="text-base font-light">
              {t('my_account_need_help', {
                linkSupportCenter: (
                  <BodyLink
                    href={'https://support.ouraring.com/hc/en-us'}
                    target="_blank"
                    color="inherit"
                    data-cy="link-support"
                  >
                    {t('my_account_support_center')}
                  </BodyLink>
                ),
              })}
            </Typography>
          </div>
        </Box>
      </PageContainer>
      <Footer />
    </div>
  );
};

MyAccount.pageName = 'My Account';
MyAccount.isSormusCompatible = true;

export default MyAccount;
