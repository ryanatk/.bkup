import { HeroVariant } from './hero-variants';
import useHeroVariant, { LIGHT_TEXT_COLORS } from './useHeroVariant';

const DEFAULT_VARIANT: HeroVariant = {
  flag: 'enable-accurate-hero',
  className: 'accurate',
  title: 'nov_2022_home_hero_title',
  body: 'nov_2022_home_hero_eyebrow',
  background: {
    mobile: 'simple-home/m-home-hero-november-22-img@2x',
    desktop: 'simple-home/d-home-hero-november-22-img@2x',
    alt: 'nov_2022_home_hero_img_alt',
  },
};

const LIGHT_VARIANT = {
  ...DEFAULT_VARIANT,
  color: LIGHT_TEXT_COLORS[0],
};

const useSetup = (variants: HeroVariant[]) => {
  const config = useHeroVariant(variants);

  return config;
};

it('sets isLightText when color is in list', () => {
  const config = useSetup([DEFAULT_VARIANT]);
});
