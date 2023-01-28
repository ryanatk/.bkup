import { camelCase } from 'lodash';

import getThemeName from './getThemeName';

import { SITE } from 'common/const';

const hosts = Object.keys(SITE);

it('returns the lowercase them name, when it exists', () => {
  hosts.forEach((host) => {
    const expected = camelCase(SITE[host].theme);
    const result = getThemeName({ host });

    expect(result).toBe(expected);
  });
});

it('returns edlen them name, when host is not found', () => {
  const host = 'some-nonsense.org';
  const expected = camelCase(SITE.default.theme);
  const result = getThemeName({ host });

  expect(result).toBe(expected);
});
