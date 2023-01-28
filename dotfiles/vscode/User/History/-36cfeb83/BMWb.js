import { CHAT, HREF, PHONE, ORG, PAYMENT_METHODS, TITLE } from './props';

// Common props, to use for each host
const getProps = (key, isTest) => {
  const { TRAINING: CHAT_TRAINING, PROD: CHAT_PROD } = CHAT[key] ?? {};

  return {
    CHAT: isTest ? CHAT_TRAINING : CHAT_PROD,
    HREF: HREF[key],
    PHONE: PHONE[key],
    ORG: ORG[key],
    TITLE: TITLE[key],
    PAYMENT_METHODS: PAYMENT_METHODS[key],
  };
};

export default getProps;
