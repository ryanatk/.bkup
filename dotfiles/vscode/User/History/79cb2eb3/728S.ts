import checkFeatureFlag from '../../../../utils/checkFeatureFlag';
import VARIANTS, { HeroVariant } from './hero-variants';

interface HeroProps extends HeroVariant {
  isLightText: boolean;
}

const LIGHT_TEXT_COLORS = ['white'];

const useHeroVariant = (): HeroProps => {
  const DEFAULT = VARIANTS[0];
  const enabledVariant = VARIANTS.find(({ flag }) =>
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
