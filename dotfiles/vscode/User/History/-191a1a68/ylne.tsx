import useGoogleOptimizeVariant, {
  VariantId,
} from '../../../hooks/useGoogleOptimizeVariant';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';

// export for easier usage
export { VariantId };

export interface GoogleOptimizeProps {
  children?: any;
  /** optional flag to check if the feature is active */
  featureFlag?: string;
  /** required to use google optimize */
  experimentId: string;
  /** required to use google optimize */
  variant: VariantId;
  /** optional fallback to show while waiting */
  waiting?: React.ReactElement;
  /** optional fallback when variant does not match */
  elseRender?: React.ReactElement;
  /** (optional override) wait for google optimize to load */
  maxWait?: number;
}

const GoogleOptimize = ({
  featureFlag,
  experimentId,
  variant,
  waiting = <></>,
  elseRender = <></>,
  children = <></>,
  maxWait,
}: GoogleOptimizeProps): JSX.Element => {
  const isActive = featureFlag ? checkFeatureFlag(featureFlag) : true;
  const wait = isActive ? maxWait : 0;
  const { ready, variantId } = useGoogleOptimizeVariant(experimentId, wait);

  // show waiting while waiting
  if (!ready) {
    return waiting;
  }

  // show component when variant matches
  if (variant === variantId) {
    return children;
  }

  // if no variant id, show if variant is Zero (control)
  if (!variantId && variant === VariantId.Zero) {
    return children;
  }

  // show a variant's elseRender
  if (elseRender) {
    return elseRender;
  }
};

export default GoogleOptimize;
