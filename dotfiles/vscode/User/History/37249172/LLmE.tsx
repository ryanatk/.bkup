import { FormikProps, FormikValues, useFormik } from 'formik';
import React, { Ref, useImperativeHandle, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFocusFirstErrorComponent from '../../../helpers/useFocusFirstErrorComponent';
import useFormikOnValidationError from '../../../helpers/useFormikOnValidationError';
import { t } from '../../../public/locales/LocaleContext';
import { Countries_content_countries } from '../../../queries/types/Countries';
import { getCountryCodeSelector } from '../../../stores/app/selectors';
import { CheckoutAddress } from '../../../types/CheckoutState';
import getRegionsByCountryCode from '../../../utils/getRegionsByCountryCode';
import Utils from '../../../utils/utils';
import { Button, FlagIcon, FormikInput, FormikSelect } from '../../sormus';
import getAddressFormValidationSchema from '../checkout/utils/getAddressFormValidationSchema';
import styles from './CheckoutShippingForm.module.scss';

interface CheckoutBillingFormProps {
  onSubmit: (values: CheckoutAddress) => void;
  loading?: boolean;
  ref?: Ref<HTMLElement>;
  initialValues?: CheckoutAddress;
  isGift?: boolean;
  disableCountry?: boolean;
  countryData: Countries_content_countries[];
}

const CheckoutBillingForm: React.FC<CheckoutBillingFormProps> =
  React.forwardRef(
    (
      {
        onSubmit = () => {},
        loading,
        initialValues = {},
        isGift = false,
        disableCountry = false,
        countryData,
      },
      ref: any,
    ) => {
      const dispatch = useDispatch();
      const checkoutFormRef = useRef(null);
      const countries = countryData.map(({ name, countryCode }) => {
        return {
          label: name,
          value: countryCode,
        };
      });
      const appCountryCode = useSelector(getCountryCodeSelector);
      const [billingRegions, setBillingRegions] = useState(() =>
        getRegionsByCountryCode(initialValues.country || appCountryCode),
      );

      const hasBillingRegions =
        Array.isArray(billingRegions) && billingRegions.length > 0;

      const checkoutFocusFirstErrorComponent =
        useFocusFirstErrorComponent(checkoutFormRef);

      const countryCode = initialValues?.country || appCountryCode;

      // Determines whether geocode country code can be sold to
      const countryCodeCanBeSoldTo =
        countries && countries.some((country) => country.value === countryCode);

      const billingFormValidationSchema = getAddressFormValidationSchema({
        state: !hasBillingRegions,
      });

      const formikBilling = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: {
          ...initialValues,
          country: countryCodeCanBeSoldTo ? countryCode : '',
        },
        validationSchema: billingFormValidationSchema,
        onSubmit: (values) => {
          const normalizedValues = Utils.normalizeObjectToNFD(values);

          try {
            if (onSubmit) onSubmit(normalizedValues);
          } catch (e) {
            console.warn('Error submitting billing form', e);
          }
        },
      });

      useFormikOnValidationError(formikBilling, () => {
        checkoutFocusFirstErrorComponent();
      });

      /**
       * Expose formik handleSubmit function to passed in ref
       */
      useImperativeHandle(
        ref,
        () => ({
          submitForm: formikBilling.handleSubmit,
        }),
        [],
      );

      const onBillingCountryChange = (
        country: { value: any; name?: string },
        formikInstance: FormikProps<FormikValues>,
      ) => {
        const regions = getRegionsByCountryCode(country.value);

        setBillingRegions(regions || []);

        // Reset state value when changing country since some countries don't display UI control for state
        formikInstance.setFieldValue('state', '', false);
      };

      return (
        <form
          data-cy="checkout-billing-form"
          id="formBilling"
          onSubmit={formikBilling.handleSubmit}
          ref={checkoutFormRef}
          noValidate
        >
          <div className="pt-2">
            {/* Intro content here */}
            <div className="pl-4">
              <div
                className={`flex flex-1 flex-wrap flex-row items-start justify-between ${styles['form--two-column']}`}
              >
                <div>
                  <FormikInput
                    label={t('checkout_form_firstname')}
                    field={'fname'}
                    formik={formikBilling}
                    maxLength={40}
                    required
                    inputProps={{
                      autoComplete: 'given-name',
                    }}
                  />
                </div>

                <div>
                  <FormikInput
                    label={t('checkout_form_lastname')}
                    field={'lname'}
                    formik={formikBilling}
                    maxLength={40}
                    required
                    inputProps={{
                      autoComplete: 'family-name',
                    }}
                  />
                </div>

                <div>
                  <FormikInput
                    label={t('checkout_form_address')}
                    field={'address'}
                    formik={formikBilling}
                    maxLength={40}
                    required
                    inputProps={{
                      autoComplete: 'address-line1',
                    }}
                  />
                </div>

                <div>
                  <FormikInput
                    label={t('checkout_form_company')}
                    field={'address2'}
                    formik={formikBilling}
                    maxLength={40}
                    inputProps={{
                      autoComplete: 'address-line2',
                    }}
                  />
                </div>

                <div>
                  <FormikInput
                    label={t('checkout_form_city')}
                    field={'city'}
                    formik={formikBilling}
                    maxLength={40}
                    required
                    inputProps={{
                      autoComplete: 'address-level2',
                    }}
                  />
                </div>

                <div>
                  {hasBillingRegions ? (
                    <FormikSelect
                      label={t('checkout_form_state')}
                      placeholder="State"
                      options={billingRegions}
                      field={'state'}
                      formik={formikBilling}
                      required
                      inputProps={{
                        autoComplete: 'address-level1',
                      }}
                    />
                  ) : (
                    <input type="hidden" name="state" />
                  )}
                </div>

                <div>
                  {countries && (
                    <FormikSelect
                      label={t('checkout_form_country')}
                      placeholder="Country"
                      options={countries}
                      IconComponent={FlagIcon}
                      iconProps={{ size: 18 }}
                      field={'country'}
                      formik={formikBilling}
                      required
                      onChange={(value) =>
                        onBillingCountryChange(value, formikBilling)
                      }
                      disabled={disableCountry}
                      inputProps={{
                        autoComplete: 'country',
                      }}
                    />
                  )}
                </div>

                <div>
                  <FormikInput
                    label={t('checkout_form_zip')}
                    field={'postal'}
                    formik={formikBilling}
                    maxLength={40}
                    required
                    inputProps={{
                      autoComplete: 'postal-code',
                    }}
                  />
                </div>

                <div
                  data-cy={`checkout-billing-email-${
                    isGift ? 'gift' : 'standard'
                  }`}
                >
                  <FormikInput
                    label={
                      isGift
                        ? t('checkout_form_email_gift_buyer')
                        : t('checkout_form_email')
                    }
                    field={'email'}
                    formik={formikBilling}
                    maxLength={40}
                    required
                    inputProps={{
                      autoComplete: 'email',
                    }}
                  />
                </div>

                <div>
                  <FormikInput
                    label={t('checkout_form_phone')}
                    field={'phone'}
                    formik={formikBilling}
                    maxLength={40}
                    required
                    inputProps={{
                      autoComplete: 'tel',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            data-cy="button-submit-billing-address"
            loading={loading}
            className="mt-4"
            aria-label="Submit Billing Address"
          >
            {t('next')}
          </Button>
        </form>
      );
    },
  );

export default CheckoutBillingForm;
