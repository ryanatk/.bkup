import useHeroVariant from './useHeroVariant';

const DEFAULT_VARIANT = {
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

const useSetup = (options, extras) => {
  const variants = [Object.assign({}, DEFAULT_VARIANT, options), extras];
  const config = useHeroVariant(variants);
  return config;
};

it('sets isLightText when color is in list', () => {
  const config = useSetup();
});