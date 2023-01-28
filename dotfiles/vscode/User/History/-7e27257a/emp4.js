import { ENV } from 'common/const';

const track = (eventName, data) => {
  // console.log('!track', { category, action, label, value, ENV });

  if (ENV.IS_TRACKING) {
    window.gtag('event', eventName, data);
  }
};

export default track;
