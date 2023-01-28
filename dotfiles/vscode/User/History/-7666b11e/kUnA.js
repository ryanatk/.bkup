import dayjs from 'dayjs';
import setLocale from './setLocale';
import setFormat from './setFormat';
import setUtc from './setUtc';
import getQueries from './getQueries';

// customize our dayjs
let customized = dayjs;

customized = setUtc(customized);
customized = setLocale(customized);
customized = setFormat(customized);
customized = getQueries(customized);

// return customized dayjs for normal usage
const date = (datetimeString) => customized(datetimeString);

export default date;
