import { CHAT, HREF, PHONE, ORG, PAYMENT_METHODS, TITLE } from './props';

// Common props, to use for each host
const getProps = (key, isTest) => {
  const { TRAINING, PROD } = CHAT[key] ?? {};

  return {
    CHAT: isTest ? TRAINING : PROD,
    HREF: HREF[key],
    PHONE: PHONE[key],
    ORG: ORG[key],
    TITLE: TITLE[key],
    PAYMENT_METHODS: PAYMENT_METHODS[key],
  };
};

export default getProps;
