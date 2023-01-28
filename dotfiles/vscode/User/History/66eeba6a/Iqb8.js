import { SITE } from 'common/const';

/**
 * Sniffs browser URL for location to determine site props
 * @param {object} location - current browser URL
 * @returns {object}
 */
const getSiteProps = (location = document.location) => {
  const { host } = location;
  const { props } = SITE[host] ?? SITE.default;

  return props ?? {};
};

export default getSiteProps;
