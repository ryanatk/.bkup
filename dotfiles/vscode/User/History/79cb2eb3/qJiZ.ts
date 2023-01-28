import checkFeatureFlag from '../../../../utils/checkFeatureFlag';
import VARIANTS, { HeroVariant } from './hero-variants';

interface HeroProps extends HeroVariant {
  isLightText: boolean;
}

const useHeroVariant = (): HeroProps => {
  const DEFAULT = VARIANTS[0];
  const active = VARIANTS.find(({ flag }) => {
    const isActive = flag ? checkFeatureFlag(flag) : false;
    return isActive;
  });
  const isLightText = ['white'].includes(active.color);

  return { ...(active ?? DEFAULT), isLightText };
};

export default useHeroVariant;
