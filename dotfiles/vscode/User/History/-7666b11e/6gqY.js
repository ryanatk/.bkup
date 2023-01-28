import dayjs from 'dayjs';
import setLocale from './setLocale';
import setFormat from './setFormat';
import getQueries from './getQueries';
import utc from 'dayjs/plugin/utc';

// customize our dayjs
let customized = dayjs;

customized.extend(utc);
customized = setLocale(customized);
customized = setFormat(customized);
customized = getQueries(customized);

// return customized dayjs for normal usage
const date = (datetimeString) => customized(datetimeString);

export default date;
