import { camelCase } from 'lodash';

import { SITE } from 'common/const';

/**
 * Get theme name by document.location.host
 * @param {object} location - current browser URL
 * @returns {string}
 */
const getThemeName = (location = document.location) => {
  const { host } = location;
  const { theme } = SITE[host] ?? SITE.default;

  return camelCase(theme);
};

export default getThemeName;
