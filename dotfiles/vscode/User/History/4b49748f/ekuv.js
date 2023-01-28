import { last } from 'lodash';

import { date } from 'common/utils';

/**
 * Evaluate if the deadline date has passed
 * @param {Date} deadlineDate - event's advanced pricing deadline
 * @param {Date} serverDate - current time, from a server response
 * @return {boolean}
 */
const getIsEarlyPricing = ({ deadlineDate, serverDate }) => {
  const getDate = (datetime) => date(datetime.split('T')[0]);
  const deadline = getDate(deadlineDate);
  const now = getDate(serverDate);

  const isEarlyPricing = deadline.endOf('day').isSameOrAfter(now);

  console.log({
    deadlineDate,
    serverDate,
    deadline,
    now,
    isEarlyPricing,
  });

  return isEarlyPricing;
};

export default getIsEarlyPricing;
