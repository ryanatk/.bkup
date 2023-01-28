import checkFeatureFlag from '../../../../utils/checkFeatureFlag';
import HERO_VARIANTS, { HeroVariant } from './hero-variants';

interface HeroProps extends HeroVariant {
  isLightText: boolean;
}

// add colors to this as we use them in HERO_VARIANTS
const LIGHT_TEXT_COLORS = ['white'];

const useHeroVariant = (): HeroProps => {
  const DEFAULT = HERO_VARIANTS[0];
  const enabledVariant = HERO_VARIANTS.find(({ flag }) =>
    flag ? checkFeatureFlag(flag) : false,
  );
  const active = enabledVariant ?? DEFAULT;
  const isLightText = LIGHT_TEXT_COLORS.includes(active.color);

  return {
    ...active,
    isLightText,
  };
};

export default useHeroVariant;
