import useGoogleOptimizeVariant, {
  VariantId,
} from '../../../hooks/useGoogleOptimizeVariant';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';

export interface GoogleOptimizeProps {
  children: any;
  /** required to use google optimize */
  variant?: VariantId;
  /** required to use google optimize */
  experimentId?: string;
  /** optional fallback to show while waiting */
  placeholder?: React.ReactElement;
  /** optional fallback to show while waiting */
  featureFlag: string;
  /** wait for google optimize to load */
  maxWait?: number;
}

const GoogleOptimize = ({
  variant,
  experimentId,
  placeholder,
  featureFlag,
  children,
  maxWait,
}: GoogleOptimizeProps): JSX.Element => {
  const isActive = featureFlag ? checkFeatureFlag(featureFlag) : true;
  const wait = isActive ? maxWait : 0;
  const { ready, variantId } = useGoogleOptimizeVariant(experimentId, wait);

  if (!experimentId || !variant) {
    return children;
  }

  const isControl = variant === VariantId.Zero;
  const timedOut = !variantId && ready;

  if ((timedOut && isControl) || variant === variantId) {
    return children;
  }

  return placeholder ?? <></>;
};

export default GoogleOptimize;
