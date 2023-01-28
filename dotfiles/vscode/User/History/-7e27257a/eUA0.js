import { ENV } from 'common/const';

const track = ([action, category, label, value]) => {
  // console.log('!track', { category, action, label, value, ENV });

  if (ENV.IS_TRACKING) {
    window.gtag('event', { category, action, label, value });
  }
};

export default track;
