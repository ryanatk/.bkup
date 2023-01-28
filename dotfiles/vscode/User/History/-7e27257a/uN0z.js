import ReactGA from 'react-ga4';

import { ENV } from 'common/const';

const track = ([category, action, label]) => {
  // console.log('!track', { category, action, label, ENV });

  if (ENV.IS_TRACKING) {
    ReactGA.event({ category, action, label });
  }
};

export default track;
