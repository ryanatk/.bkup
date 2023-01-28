import { date } from 'common/utils';

const getIsEarlyPricing = ({ deadlineDate, serverDate }) => {
  const offset = serverDate.split('-')[1];
  const deadline =
    !deadlineDate.includes('-') && offset
      ? deadlineDate + '-' + offset
      : deadlineDate;

  date(deadline).endOf('day').isSameOrAfter(serverDate);
};

export default getIsEarlyPricing;
