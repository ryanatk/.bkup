import { PAYMENT_METHOD as CONFIG } from 'common/const/payment-method';

const { CARD, ACH, WIRE } = CONFIG;

const PAYMENT_METHOD = {
  BJCC: [CARD, ACH, WIRE],
  CAJUN: [CARD],
  EDLEN: [CARD, ACH, WIRE],
};

export default PAYMENT_METHOD;
