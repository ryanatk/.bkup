import { date } from 'common/utils';

/**
 * Evaluate if the deadline date has passed
 * @param {Date} deadlineDate - event's advanced pricing deadline
 * @param {Date} serverDate - current time, from a server response
 * @return {boolean}
 */
const getIsEarlyPricing = ({ deadlineDate, serverDate }) => {
  const offset = serverDate.split('-')[1];
  const deadline =
    offset && !deadlineDate.includes('-')
      ? deadlineDate + '-' + offset
      : deadlineDate;

  return date(deadline).endOf('day').isSameOrAfter(serverDate);
};

export default getIsEarlyPricing;
