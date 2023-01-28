import checkFeatureFlag from '../../../../utils/checkFeatureFlag';
import HERO_VARIANTS, { HeroVariant } from './hero-variants';

// add colors to this list, from HERO_VARIANTS
export const LIGHT_TEXT_COLORS = ['white'];

interface HeroProps extends HeroVariant {
  isLightText: boolean;
}

const useHeroVariant = (variants = HERO_VARIANTS): HeroProps => {
  const DEFAULT = variants[0];
  const enabledVariant = variants.find(({ flag }) =>
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
