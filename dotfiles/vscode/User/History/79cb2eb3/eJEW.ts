import { useSelector } from 'react-redux';
import { getAppDataSelector } from '../../../../stores/app/selectors';
import HERO_VARIANTS, { HeroVariant } from './hero-variants';

// add colors to this list, from HERO_VARIANTS
export const LIGHT_TEXT_COLORS = ['white'];

export interface HeroProps extends HeroVariant {
  isLightText: boolean;
}

const useHeroVariant = (variants = HERO_VARIANTS): HeroProps => {
  const DEFAULT = variants[0];
  const { flags } = useSelector(getAppDataSelector);
  console.log({ flags });

  const enabledVariant = variants.find(({ flag }) => flag && flags[flag]);
  const active = enabledVariant ?? DEFAULT;

  const isLightText = LIGHT_TEXT_COLORS.includes(active.color);

  return {
    ...active,
    isLightText,
  };
};

export default useHeroVariant;
