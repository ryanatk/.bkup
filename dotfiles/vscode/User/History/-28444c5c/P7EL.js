import getSiteProps from './getSiteProps';

import { SITE } from 'common/const';

const hosts = Object.keys(SITE);

it('returns props for listed hosts', () => {
  hosts.forEach((host) => {
    const expected = SITE[host].props;
    const result = getSiteProps({ host });

    expect(result).toBe(expected);
  });
});

it('returns Edlen by default', () => {
  const host = 'some-nonsense.org';
  const expected = SITE.default.props;
  const result = getSiteProps({ host });

  expect(result).toBe(expected);
});
