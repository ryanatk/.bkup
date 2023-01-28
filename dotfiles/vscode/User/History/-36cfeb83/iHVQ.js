import { merge } from 'lodash';

import { CHAT, HREF, PHONE, TITLE } from './props';

const PROD_PROPS = { CHAT: CHAT.PROD };
const TEST_PROPS = { CHAT: CHAT.TRAINING };

// Common props, to use for each host
const getProps = (key, isTest) => {
  const COMMON_PROPS = isTest ? PROD_PROPS : TEST_PROPS;

  return merge({}, COMMON_PROPS, HREF[key], PHONE[key], TITLE[key]);
};

export default getProps;
