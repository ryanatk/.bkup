import * as yup from 'yup';
import VALID from './validation';

const setup = (number) => {
  const schema = yup.object().shape({ number: VALID.PHONE_NUMBER });
  return schema.isValid({ number });
};

it('VALID recognizes a valid USA domestic phone number with -', async () => {
  const result = await setup('541-754-3010');
  expect(result).toEqual(true);
});

it('VALID recognizes a valid USA domestic phone number', async () => {
  const result = await setup('5417543010');
  expect(result).toEqual(true);
});

it('VALID recognizes a valid USA domestic phone number with spaces', async () => {
  const result = await setup('541 754 3010');
  expect(result).toEqual(true);
});

it('VALID recognizes a valid USA domestic phone number with () and -', async () => {
  const result = await setup('(541)754-3010');
  expect(result).toEqual(true);
});

it('VALID recognizes a valid USA domestic phone number with () and spaces', async () => {
  const result = await setup('(541) 754 3010');
  expect(result).toEqual(true);
});

it('VALID recognizes a valid international phone number', async () => {
  const result = await setup('1-541-754-3010');
  expect(result).toEqual(true);
});

it('VALID recognizes a valid international phone number with +', async () => {
  const result = await setup('+1-541-754-3010');
  expect(result).toEqual(true);
});

it('VALID recognizes a valid foreign international phone number ', async () => {
  const result = await setup('191 541 754 3010');
  expect(result).toEqual(true);
});

it('VALID recognizes a valid foreign international phone number with + ', async () => {
  const result = await setup('+191 541 754 3010');
  expect(result).toEqual(true);
});

it('VALID recognizes a valid foreign international phone number with + and ()', async () => {
  const result = await setup('+191 (541) 754 3010');
  expect(result).toEqual(true);
});

it('VALID recognizes an invalid phone number that is too long', async () => {
  const result = await setup('12345678901234567890123456789');
  expect(result).toEqual(false);
});
