const track = (eventName, data = {}) => {
  // console.log('!track', { eventName, data, ENV });

  window.gtag('event', eventName, data);
};

export default track;
