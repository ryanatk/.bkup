import checkFeatureFlag from '../../../../utils/checkFeatureFlag';
import VARIANTS, { HeroVariant } from './hero-variants';

const useHeroVariant = (): HeroVariant => {
  return VARIANTS.find(({ flag }) => checkFeatureFlag(flag)) ?? VARIANTS[0];
};

export default useHeroVariant;
