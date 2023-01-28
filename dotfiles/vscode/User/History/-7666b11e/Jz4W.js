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

date.tz = customized.prototype.tz;

console.log(date.tz('2022-01-26T00:00:00'));

export default date;
