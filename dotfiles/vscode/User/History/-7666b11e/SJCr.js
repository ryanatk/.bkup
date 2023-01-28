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

console.log(date.tz.get());
console.log(date('2022-04-20T23:00:00.00-07:00').$d);
console.log(date('2022-04-20T23:00:00.00').$d);
console.log(date('2023-02-14T00:00:00').$d);

export default date;
