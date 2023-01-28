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

  const isEarlyPricing = date(deadline)
    .endOf('day')
    .isSameOrAfter(date(serverDate));

  console.log({
    deadlineDate,
    serverDate,
    deadline,
    'date(deadline)': date(deadline),
    'date(serverDate)': date(serverDate),
    isEarlyPricing,
  });

  return isEarlyPricing;
};

export default getIsEarlyPricing;