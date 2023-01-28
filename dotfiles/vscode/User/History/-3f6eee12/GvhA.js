import utc from 'dayjs/plugin/utc';

const setUtc = (dayjs) => {
  dayjs.extend(utc);

  return dayjs;
};

export default setUtc;
