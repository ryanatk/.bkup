import { last } from 'lodash';

import { date } from 'common/utils';

/**
 * Evaluate if the deadline date has passed
 * @param {Date} deadlineDate - event's advanced pricing deadline
 * @param {Date} serverDate - current time, from a server response
 * @return {boolean}
 */
const getIsEarlyPricing = ({ deadlineDate, serverDate }) => {
  const isMissingOffset = !last(deadlineDate.split('T')).includes('-');
  const deadline = date(deadlineDate.split('T')[0]);
  const now = date(serverDate.split('T')[0]);

  const isEarlyPricing = deadline.endOf('day').isSameOrAfter(now);

  console.log({
    isMissingOffset,
    deadlineDate,
    serverDate,
    deadline,
    now,
    // 'date(deadline)': date(deadline),
    // 'date(serverDate)': date(serverDate),
    isEarlyPricing,
  });

  return isEarlyPricing;
};

export default getIsEarlyPricing;
