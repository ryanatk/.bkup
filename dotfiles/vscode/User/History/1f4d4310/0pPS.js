import * as yup from 'yup';
import luhn from 'luhn';

import { validate as uuidValidate } from 'uuid';

import { ADDRESS_TYPE } from 'common/const';
import { log, date } from 'common/utils';

/**
 * Centralized group of validation rules.
 * These can be further extended in forms using method chaining.
 * https://www.npmjs.com/package/yup#user-content-api
 *
 * Example usage for required email:
 *   Email: VALID.EMAIL.required(),
 */

const VALID = {
  /**
   * Check if a value is valid with a specific test
   * @param value - value to test Ex. example@gmail.com
   * @param test - VALID function to test value on Ex. VALID.EMAIL
   * @returns true if valid OR throws an error if invalid
   */
  check: async (value, test) => {
    const schema = yup.object().shape({ value: test });

    await schema
      .validate({ value })
      .then(() => true)
      .catch(({ errors }) => {
        log('validation check fail', {
          error: errors,
          data: test, // do not log value, for security
          throw: true,
          type: 'validation',
        });
      });
  },

  /**
   * Check if an array of values is valid with specific tests
   * @param args - Checks to make format: [name, value, test], [name, value, test, isOptional], [...]
   *               Ex. ['customerId', cart.customerId, VALID.CUSTOMER_ID],
   * @returns true if valid OR throws an error if invalid
   */
  checkAll: async (...args) => {
    // Create an array from args
    // Reduce each element of the array into an object (obj)
    const { shape, values } = Array.from(args).reduce(
      (obj, [name, value, test, isOptional]) => ({
        shape: {
          ...obj.shape,
          [name]: isOptional
            ? test.notRequired()
            : test.required(`${name} is required!`),
        },
        values: {
          ...obj.values,
          [name]: value,
        },
      }),
      {},
    );
    const schema = yup.object().shape(shape);

    await schema
      .validate(values)
      .then(() => true)
      .catch(({ errors }) => {
        log('validation checkAll fail', {
          error: errors,
          data: shape, // do not log values, for security
          throw: true,
          type: 'validation',
        });
      });
  },

  // Generic Types
  BOOL: yup.bool(),
  STRING: yup.string(),
  NUM: yup.number(),
  NUMBER: yup
    .string()
    .test('number', 'Must be a number', (value) => !value || !isNaN(value)),
  OBJECT: yup.object(),

  // --------------------------------------------------------
  // Customer Facing
  // --------------------------------------------------------

  // login, sign up
  EMAIL: yup.string().email('Email must be a valid email'),
  PASSWORD: yup.string(),

  // addresses
  COUNTRY: yup.string().nullable(),
  CITY: yup.string().nullable(),
  TOWN: yup.string().nullable(),
  STATE: yup.string().nullable(),
  REGION: yup.string().nullable(),
  ADDRESS: yup.string().nullable(),
  ADDRESS_2: yup.string().nullable(),
  ZIP: yup
    .string()
    .nullable()
    .matches(/\b\d{5}\b/g, 'Zip code must be exactly 5 numbers'),
  LOCALITY: yup.string().nullable(),
  PROVINCE: yup.string().nullable(),
  DISTRICT: yup.string().nullable(),
  POSTAL_CODE: yup.string().nullable(),

  // Name
  FIRST_NAME: yup.string(),
  LAST_NAME: yup.string(),
  FULL_NAME: yup.string(),

  // Phone Number
  PHONE_NUMBER: yup.string().nullable().max(25, 'Phone number is too long'),

  // Payment
  CARD_NUMBER: yup
    .string()
    .test('luhn', 'Invalid Credit Card Number', (number) =>
      luhn.validate(number),
    ),
  EXPIRATION_DATE: yup
    .string()
    .matches(/([0-9]{2})\/([0-9]{2})/, 'Expiration date must be MM/YY format')
    .test('date format', 'Invalid Expiration Date', (dateInput) => {
      const [month, year] = dateInput.split('/');

      const currentMonth = date().format('MM');
      const currentYear = date().format('YY');

      if (month > 12 || month < 1) return false;
      if (year < currentYear) return false;

      if (year === currentYear && currentMonth > month) return false;

      return true;
    }),

  CVV: yup
    .string()
    .matches(/^[0-9]+$/, 'CVV must be a number')
    .min(3, 'CVV must be at least 3 characters')
    .max(4, 'CVV must be 4 characters or less'),

  FILE_SIZE: (max) =>
    yup.number().max(max * 1000000, `File size must be less than ${max}MB`),

  FILE_TYPE: (type) => yup.string().matches(type, `File must be a '${type}'`),

  // --------------------------------------------------------
  // Internal
  // --------------------------------------------------------

  // Addresses
  BILLING_ADDRESS_ID: yup
    .string()
    .test('uuid', 'billingAddressId must be a uuid value', uuidValidate),
  EXHIBITOR_ADDRESS_ID: yup
    .string()
    .test('uuid', 'exhibitorAddressId must be a uuid value', uuidValidate),
  ADDRESS_ID: yup
    .string()
    .test('uuid', 'addressId must be a uuid value', uuidValidate),

  ADDRESS_TYPE: yup
    .string()
    .test('oneof', 'Invalid Address Type', (addressType) =>
      Object.values(ADDRESS_TYPE).includes(addressType),
    ),

  // Customer
  CUSTOMER_ID: yup
    .string()
    .test('uuid', 'customerId must be a uuid value', uuidValidate),

  COMPANY_NAME: yup.string(),

  // Location
  COUNTRY_ID: yup.number(),

  // Customer
  EXHIBITOR_ID: yup
    .string()
    .test('uuid', 'exhibitorId must be a uuid value', uuidValidate),

  // Event
  EVENT_ID: yup.string(),

  // Booth Questions
  ASSESSMENT_RESPONSE_ID: yup
    .string()
    .test('uuid', 'Assessment Response ID must be a uuid value', uuidValidate),

  // Ordering
  PRICE_LIST_ID: yup
    .string()
    .test('uuid', 'priceListId must be a uuid value', uuidValidate),
  OO_SUMMARY_ID: yup.number(),
  OOID: yup.number(),

  DOCUMENT_ID: yup
    .string()
    .test('uuid', 'documentId must be a uuid value', uuidValidate),

  CART_ID: yup
    .string()
    .test('uuid', 'cartId must be a uuid value', uuidValidate),
};

export default VALID;
