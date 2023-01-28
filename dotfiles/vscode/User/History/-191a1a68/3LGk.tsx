import useGoogleOptimizeVariant, {
  VariantId,
} from '../../../hooks/useGoogleOptimizeVariant';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';

// export for easier usage
export { VariantId };

interface GoogleOptimizeProps {
  children: any;
  /** optional flag to check if the feature is active */
  featureFlag?: string;
  /** required to use google optimize */
  experimentId: string;
  /** required to use google optimize */
  variant: VariantId;
  /** optional fallback to show while waiting */
  placeholder?: React.ReactElement;
  /** wait for google optimize to load */
  maxWait?: number;
}

const GoogleOptimize = ({
  featureFlag,
  experimentId,
  variant,
  placeholder = <></>,
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

  const isControl = variant === VariantId.Zero;

  // show component when matched
  if (variant === variantId || (!variantId && isControl)) {
    return children;
  }

  // otherwise show nothing
  return <></>;
};

export default GoogleOptimize;
