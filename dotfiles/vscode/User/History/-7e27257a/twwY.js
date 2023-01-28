import ReactGA from 'react-ga4';

import { ENV } from 'common/const';

const track = ([action, category, label, value]) => {
  console.log('!track', { category, action, label, value, ENV });

  if (ENV.IS_TRACKING) {
    ReactGA.event({ category, action, label, value });
  }
};

export default track;
