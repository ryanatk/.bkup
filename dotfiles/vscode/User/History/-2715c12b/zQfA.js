const getBaseUrl = (version = '1') => {
  if (process.env.REACT_APP_USE_DEVELOPMENT_BASE_URL === 'true') {
    return `${window.location.origin}/${version}/`;
  } else if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return `https://184.184.231.238:8020/${version}/`;
  } else {
    return `${window.location.origin}/${version}/`;
  }
};

export default getBaseUrl;
