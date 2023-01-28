import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

const setTimezone = (dayjs) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const guess = dayjs.tz.guess();
  console.log({ guess });

  dayjs.tz.setDefault(guess);

  return dayjs;
};

export default setTimezone;
