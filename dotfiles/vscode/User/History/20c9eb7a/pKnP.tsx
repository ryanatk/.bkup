import { ACTIVE_EXPERIMENT_ID } from '../../../../consts/experiments/chooseYourAdventure';
import useGoogleOptimizeVariant, {
  VariantId,
} from '../../../../hooks/useGoogleOptimizeVariant';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import checkFeatureFlag from '../../../../utils/checkFeatureFlag';
import { breakpoints } from '../../../sormus/constants';

export interface UseHeaderTest {
  heroPush: boolean;
  ready: boolean;
  variantId: string;
}

export const useHeaderTest = (): UseHeaderTest => {
  const isCombinedHeaderTestEnabled = checkFeatureFlag(
    'enable-combined-header',
  );
  const matchLargeScreen = useMediaQuery(`(min-width: ${breakpoints.large}px)`);

  const { ready, variantId } = useGoogleOptimizeVariant(
    ACTIVE_EXPERIMENT_ID,
    isCombinedHeaderTestEnabled ? 2000 : 0,
    { experimentName: 'Choose your adventure test' },
  );

  // adjust hero top on mobile variant
  const heroPush = ready && variantId !== VariantId.One && !matchLargeScreen;

  return { heroPush, ready, variantId };
};
