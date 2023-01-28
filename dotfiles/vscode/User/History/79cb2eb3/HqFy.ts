import checkFeatureFlag from '../../../../utils/checkFeatureFlag';
import VARIANTS from './hero-variants';

const useHeroVariant = () => {
  VARIANTS.find((flag) => checkFeatureFlag(flag));
};
