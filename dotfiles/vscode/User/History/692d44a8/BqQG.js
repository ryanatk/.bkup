import useHeroVariant, { LIGHT_TEXT_COLORS } from './useHeroVariant';

const DEFAULT_FLAG = 'default-flag';
const ALT_FLAG = 'alt-flag';

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation(() => ({
    flags: {
      [DEFAULT_FLAG]: true,
      [ALT_FLAG]: false,
    },
  })),
}));

const DEFAULT_VARIANT = {
  flag: DEFAULT_FLAG,
  className: 'className',
  title: 'nov_2022_home_hero_title',
  body: 'nov_2022_home_hero_eyebrow',
  background: {
    mobile: 'default-mobile-image',
    desktop: 'default-desktop-image',
    alt: 'nov_2022_home_hero_img_alt',
  },
};

const LIGHT_VARIANT = {
  ...DEFAULT_VARIANT,
  color: LIGHT_TEXT_COLORS[0],
};

const useSetup = (variants) => {
  const config = useHeroVariant(variants);

  return config;
};

it('does not set isLightText when there is no color', () => {
  const { isLightText } = useSetup([DEFAULT_VARIANT]);
  expect(isLightText).toBeFalsy();
});

it('sets isLightText when color is in list', () => {
  const { isLightText } = useSetup([LIGHT_VARIANT]);
  expect(isLightText).toBeTruthy();
});
