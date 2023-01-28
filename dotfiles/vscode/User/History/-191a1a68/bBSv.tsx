import useGoogleOptimizeVariant, {
  VariantId,
} from '../../../hooks/useGoogleOptimizeVariant';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';

export interface GoogleOptimizeProps {
  /** required to use google optimize */
  variant?: VariantId;
  /** required to use google optimize */
  experimentId?: string;
  /** optional fallback to show while waiting */
  placeholder?: React.ReactElement;
  featureFlag: string;
  children: any;
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
  const isActive = checkFeatureFlag(featureFlag);
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
