import { merge } from 'lodash';

import { CHAT, HREF, PHONE, ORG, PAYMENT_METHODS, TITLE } from './props';

const PROD_PROPS = { CHAT: CHAT.PROD };
const TEST_PROPS = { CHAT: CHAT.TRAINING };

// Common props, to use for each host
const getProps = (key, isTest) => {
  const COMMON_PROPS = isTest ? TEST_PROPS : PROD_PROPS;

  return merge({}, COMMON_PROPS, {
    HREF: HREF[key],
    PHONE: PHONE[key],
    ORG: ORG[key],
    TITLE: TITLE[key],
    PAYMENT_METHODS: PAYMENT_METHODS[key],
  });
};

export default getProps;
