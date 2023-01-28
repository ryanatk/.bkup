import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { EventType } from '../../../analytics';
import { t } from '../../../public/locales/LocaleContext';
import { useFeatureFlag } from '../../../queries/FeaturesConfig';
import { reqAnalyticsEvent } from '../../../stores/app/actions';
import Utils from '../../../utils/utils';
import { BodyLink, Button, Typography } from '../../sormus';
import FormikInput from '../../sormus/FormikInput';

interface FormInitialValues {
  email?: string;
  emailConfirm?: string;
}

interface CheckoutAccountEmailProps {
  onSubmit?: (email: string) => void;
  loading?: boolean;
  disabled?: boolean;
  initialValues?: FormInitialValues;
  prefillEmail?: string;
  isGift?: boolean;
}

const emailMessage = t('checkout_accountemaildescription');

export const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .lowercase()
    .required(() => t('checkout_form_emailrequired'))
    .email(() => t('checkout_form_emailformat'))
    .matches(
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*$/,
      () => t('checkout_form_emailformat'),
    )
    .max(40, () => t('checkout_form_40characters')),
  emailConfirm: Yup.string()
    .trim()
    .lowercase()
    .email(() => t('checkout_form_emailformat'))
    .required(() => t('checkout_form_emailrequired'))
    .oneOf([Yup.ref('email'), null], () => t('checkout_form_email_match')),
});

const CheckoutAccountEmail: FC<CheckoutAccountEmailProps> = ({
  onSubmit,
  prefillEmail,
  disabled = false,
  initialValues = {},
  isGift = false,
  loading = false,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enabled: oneMonthEnabled } = useFeatureFlag(
    'one-month-free-membership',
  );

  const emailHelpLink =
    router.locale === 'fi'
      ? 'https://support.ouraring.com/hc/fi/articles/360038973453'
      : router.locale === 'de'
      ? 'https://support.ouraring.com/hc/de/articles/360038973453'
      : 'https://support.ouraring.com/hc/en-us/articles/360038973453-How-to-Gift-an-Oura-Ring';

  const giftEmailMessage = t(
    oneMonthEnabled
      ? 'checkout_accountemail_gift_onemonth'
      : 'checkout_accountemaildescription_gift',
    {
      link: (
        <BodyLink
          color="inherit"
          href={emailHelpLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('checkout_accountemaildescription_link')}
        </BodyLink>
      ),
    },
  );
  const formikEmail = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: emailValidationSchema,
    initialValues,
    onSubmit: async (values) => {
      const normalizedValues = Utils.normalizeObjectToNFD(values);
      try {
        dispatch(
          reqAnalyticsEvent({
            type: EventType.CheckoutNewStepCompleted,
            payload: {
              step: 1,
              email: normalizedValues.email,
            },
          }),
        );

        if (onSubmit) onSubmit(normalizedValues.email);
      } catch (e) {
        console.warn('Error submitting account email form', e);
      }
    },
  });

  if (prefillEmail) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();

          dispatch(
            reqAnalyticsEvent({
              type: EventType.CheckoutNewStepCompleted,
              payload: {
                step: 1,
                email: prefillEmail,
              },
            }),
          );

          if (onSubmit) onSubmit(prefillEmail);
        }}
        noValidate
      >
        <div className="pt-2">
          <div className="pl-4">
            <div>
              <FormikInput
                formik={formikEmail}
                label={prefillEmail}
                field="prefillEmail"
                type="prefillEmail"
                disabled={true}
              />
            </div>
          </div>
        </div>
        <Button
          type="submit"
          data-cy="checkout-account-next-button"
          loading={loading}
          className="mt-4"
        >
          {t('next')}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={formikEmail.handleSubmit} noValidate>
      <div className="pt-2">
        <Typography
          className="mb-4"
          color="helsinkiBlue-dark"
          data-cy={`checkout-email-message-${isGift ? 'gift' : 'standard'}`}
        >
          {isGift ? giftEmailMessage : emailMessage}
        </Typography>
        <div className="pl-4 max-w-lg">
          <div>
            <FormikInput
              formik={formikEmail}
              label={
                isGift
                  ? t('checkout_form_recipients_email')
                  : t('checkout_form_email')
              }
              field="email"
              type="email"
              required
              disabled={disabled}
              data-is-gift={isGift}
            />
          </div>
          <div className="mt-2">
            <FormikInput
              formik={formikEmail}
              label={
                isGift
                  ? t('checkout_form_recipients_email_confirm')
                  : t('checkout_form_email_confirm')
              }
              field="emailConfirm"
              type="email"
              required
              disabled={disabled}
            />
          </div>
        </div>
      </div>
      <Button
        type="submit"
        data-cy="checkout-account-next-button"
        loading={loading}
        className="mt-4"
        aria-label="Submit Account Email"
      >
        {t('next')}
      </Button>
    </form>
  );
};

export default CheckoutAccountEmail;
