import getSiteOwnership from './getSiteOwnership';

import { SITE } from 'common/const';

const hosts = Object.keys(SITE);

it('returns owner for listed hosts', () => {
  hosts.forEach((host) => {
    const expected = SITE[host].owner;
    const result = getSiteOwnership({ host });

    expect(result).toBe(expected);
  });
});

it('returns Edlen by default', () => {
  const host = 'some-nonsense.org';
  const expected = SITE.default.owner;
  const result = getSiteOwnership({ host });

  expect(result).toBe(expected);
});
