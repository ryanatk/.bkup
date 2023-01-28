import useGoogleOptimizeVariant, {
  VariantId,
} from '../../../hooks/useGoogleOptimizeVariant';

export interface GoogleOptimizeProps {
  /** required to use google optimize */
  variant?: VariantId;
  /** required to use google optimize */
  experiment?: string;
  /** optional fallback to show while waiting */
  placeholder?: React.ReactElement;
  flag: string;
  children: any;
}

const GoogleOptimize = ({
  variant,
  experiment,
  placeholder,
  flag,
  children,
}: GoogleOptimizeProps): JSX.Element => {
  const { ready, variantId } = useGoogleOptimizeVariant(experiment);

  if (!experiment || !variant) {
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
