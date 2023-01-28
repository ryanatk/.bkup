import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

const setTimezone = (dayjs) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  dayjs.tz.setDefault('America/New_York');

  console.log('?', dayjs.tz.name);

  return dayjs;
};

export default setTimezone;
