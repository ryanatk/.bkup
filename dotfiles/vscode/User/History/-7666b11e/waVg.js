import dayjs from 'dayjs';
import setTimezone from './setTimezone';
import setFormat from './setFormat';
import getQueries from './getQueries';

// customize our dayjs
let customized = dayjs;

customized = setTimezone(customized);
customized = setFormat(customized);
customized = getQueries(customized);

// return customized dayjs for normal usage
const date = (datetimeString) => customized(datetimeString);

export default date;
