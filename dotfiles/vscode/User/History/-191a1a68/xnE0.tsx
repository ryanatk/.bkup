import useGoogleOptimizeVariant, {
  VariantId,
} from '../../../hooks/useGoogleOptimizeVariant';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';

// export for easier usage
export { VariantId };

export interface GoogleOptimizeProps {
  children: React.ReactElement;
  /** optional flag to check if the feature is active */
  featureFlag?: string;
  /** required to use google optimize */
  experimentId: string;
  /** required to use google optimize */
  variant: VariantId;
  /** optional fallback to show while waiting */
  placeholder?: React.ReactElement;
  /** optional fallback to show while waiting */
  control?: React.ReactElement;
  /** wait for google optimize to load */
  maxWait?: number;
}

const GoogleOptimize = ({
  featureFlag,
  experimentId,
  variant,
  placeholder = <></>,
  control,
  children,
  maxWait,
}: GoogleOptimizeProps): JSX.Element => {
  const isActive = featureFlag ? checkFeatureFlag(featureFlag) : true;
  const wait = isActive ? maxWait : 0;
  const { ready, variantId } = useGoogleOptimizeVariant(experimentId, wait);

  // show placeholder while waiting
  if (!ready) {
    return placeholder;
  }

  // show component when variant matches
  if (variant === variantId) {
    return children;
  }

  // if no variant id, show if variant is Zero (control)
  if (!variantId && variant === VariantId.Zero) {
    return children;
  }

  // show a variant's control, when passed in
  if (control) {
    return control;
  }

  // otherwise show nothing
  return <></>;
};

export default GoogleOptimize;
