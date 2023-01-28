import { ENV } from 'common/const';

const track = (eventName, data = {}) => {
  // console.log('!track', { eventName, data, ENV });

  const options = ENV.IS_TRACKING ? { ...data, debug_mode: true } : data;

  window.gtag('event', eventName, options);
};

export default track;
