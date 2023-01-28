import { merge } from 'lodash';

import { CHAT, HREF, PHONE, ORG, PAYMENT_METHODS, TITLE } from './props';

// Common props, to use for each host
const getProps = (key, isTest) => {
  const COMMON_PROPS = isTest
    ? { CHAT: CHAT[key]?.TRAINING }
    : { CHAT: CHAT[key]?.PROD };

  return merge({}, COMMON_PROPS, {
    HREF: HREF[key],
    PHONE: PHONE[key],
    ORG: ORG[key],
    TITLE: TITLE[key],
    PAYMENT_METHODS: PAYMENT_METHODS[key],
  });
};

export default getProps;
