import checkFeatureFlag from '../../../../utils/checkFeatureFlag';
import VARIANTS, { HeroVariant } from './hero-variants';

const useHeroVariant = (): HeroVariant => {
  const DEFAULT = VARIANTS[0];
  const active = VARIANTS.find(({ flag }) => {
    const isActive = flag ? checkFeatureFlag(flag) : false;
    return isActive;
  });

  return active ?? DEFAULT;
};

export default useHeroVariant;
