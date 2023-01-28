/**
 * Common function to let us setup (and update) tracking in 1 common location
 * @param {string} eventName - event names listed in google analytics docs
 * @param {object} [data] - event data, detailed in google analytics docs
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events
 */
const track = (eventName, data = {}) => {
  // console.log('!track', { eventName, data });

  if (eventName && typeof eventName === 'string') {
    window.gtag('event', eventName, data);
  }
};

export default track;
