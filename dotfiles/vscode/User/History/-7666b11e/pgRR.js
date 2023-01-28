import dayjs from 'dayjs';
import setTimezone from './setTimezone';
import setLocale from './setLocale';
import setFormat from './setFormat';
import getQueries from './getQueries';

// customize our dayjs
let customized = dayjs;

// customized = setTimezone(customized);
customized = setLocale(customized);
customized = setFormat(customized);
customized = getQueries(customized);

// return customized dayjs for normal usage
const date = (datetimeString) => customized(datetimeString);

console.log(Object.keys(dayjs));
console.log(dayjs.prototype);

date.prototype = {
  ...dayjs.prototype,
  tz: dayjs.tz,
};

console.log(date.prototype);

// setTimezone(date);

console.log('*', date?.tz?.name);

export default date;
