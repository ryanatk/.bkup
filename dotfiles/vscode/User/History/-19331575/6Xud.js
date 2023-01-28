import { SITE } from 'common/const';

/**
 * Sniffs browser URL for location to determine site ownership
 * @param {object} location - current browser URL
 * @returns {string} One of BJCC, Cajun, or Edlen
 */
const getSiteOwnership = (location = document.location) => {
  const { host } = location;
  const { owner } = SITE[host] ?? SITE.default;

  return owner;
};

export default getSiteOwnership;
