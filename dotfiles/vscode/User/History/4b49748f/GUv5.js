import { date } from 'common/utils';

const getIsEarlyPricing = ({ deadlineDate, serverDate }) => {
  const offset = serverDate.split('-')[1];
  const deadline = deadlineDate.includes('-')
    ? deadlineDate
    : offset
    ? deadlineDate + '-' + offset
    : deadline;

  date(deadlineDate).endOf('day').isSameOrAfter(serverDate);
};

export default getIsEarlyPricing;
