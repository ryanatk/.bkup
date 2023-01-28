import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

const setTimezone = (dayjs) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  dayjs.tz.setDefault('America/Los_Angeles');

  console.log(dayjs.tz);

  return dayjs;
};

export default setTimezone;
