import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

const setTimezone = (dayjs) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const tz = dayjs.tz('America/Los Angeles');
  console.log({ tz });

  dayjs.tz.setDefault(tz);

  return dayjs;
};

export default setTimezone;
