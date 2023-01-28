import useHeroVariant, { LIGHT_TEXT_COLORS } from './useHeroVariant';

const ON_FLAG = 'default-flag';
const OFF_FLAG = 'alt-flag';

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation(() => ({
    flags: {
      [ON_FLAG]: true,
      [OFF_FLAG]: false,
    },
  })),
}));

const DEFAULT_VARIANT = {
  flag: OFF_FLAG,
  className: 'className',
  title: 'nov_2022_home_hero_title',
  body: 'nov_2022_home_hero_eyebrow',
  background: {
    mobile: 'default-mobile-image',
    desktop: 'default-desktop-image',
    alt: 'nov_2022_home_hero_img_alt',
  },
};

it('returns the 1st variant whose flag is on', () => {
  const { flag } = useHeroVariant([
    DEFAULT_VARIANT,
    { ...DEFAULT_VARIANT, flag: ON_FLAG },
  ]);
  expect(flag).not.toBe(OFF_FLAG);
  expect(flag).toBe(ON_FLAG);
});

it('returns the 1st variant when no flag is on', () => {
  const { flag } = useHeroVariant([{ ...DEFAULT_VARIANT, flag: OFF_FLAG }]);
  expect(flag).toBe(OFF_FLAG);
});

it('sets isLightText when color is in list', () => {
  const { isLightText } = useHeroVariant([
    { ...DEFAULT_VARIANT, color: LIGHT_TEXT_COLORS[0] },
  ]);
  expect(isLightText).toBeTruthy();
});

it('does not set isLightText when there is no color', () => {
  const { isLightText } = useHeroVariant([DEFAULT_VARIANT]);
  expect(isLightText).toBeFalsy();
});
