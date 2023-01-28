import dayjs from 'dayjs';
import setTimezone from './setTimezone';
import setLocale from './setLocale';
import setFormat from './setFormat';
import getQueries from './getQueries';

// customize our dayjs
let customized = dayjs;

customized = setTimezone(customized);
customized = setLocale(customized);
customized = setFormat(customized);
customized = getQueries(customized);

// return customized dayjs for normal usage
const date = (datetimeString) => customized(datetimeString);

console.log(Object.keys(dayjs));
console.log(Object.keys(customized));
console.log(Object.keys(date));
console.log(dayjs.prototype);
console.log(customized.prototype);

date.prototype = {
  ...date.prototype,
  ...customized.prototype,
};

console.log(date.prototype);

// setTimezone(date);

console.log('*', date?.tz?.name);

export default date;
