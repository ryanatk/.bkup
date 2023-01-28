import checkFeatureFlag from '../../../../utils/checkFeatureFlag';
import VARIANTS from './hero-variants';

const useHeroVariant = () => {
  return VARIANTS.find(({ flag }) => checkFeatureFlag(flag));
};

export default useHeroVariant;
