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
  [x: string]: any;
}

const withGoogleOptimize = (Component) => {
  return function GoogleOptimize({
    variant,
    experiment,
    placeholder,
    ...props
  }: GoogleOptimizeProps): JSX.Element {
    if (!experiment || !variant) {
      return <Component {...props} />;
    }

    const { ready, variantId } = useGoogleOptimizeVariant(experiment);
    const timedOut = variant === VariantId.Zero && !variantId && ready;

    if (timedOut || variant === variantId) {
      return <Component {...props} />;
    }

    return placeholder ?? <></>;
  };
};

export default withGoogleOptimize;
