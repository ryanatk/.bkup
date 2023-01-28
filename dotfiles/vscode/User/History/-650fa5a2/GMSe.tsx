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
  /** additional props, for nested component */
  [x: string]: any;
}

const withGoogleOptimize = (Component) => {
  return function GoogleOptimize({
    variant,
    experiment,
    placeholder,
    ...props
  }: GoogleOptimizeProps): JSX.Element {
    const { ready, variantId } = useGoogleOptimizeVariant(experiment);

    if (!experiment || !variant) {
      return <Component {...props} />;
    }

    const isControl = variant === VariantId.Zero;
    const timedOut = !variantId && ready;

    if ((timedOut && isControl) || variant === variantId) {
      return <Component {...props} />;
    }

    return placeholder ?? <></>;
  };
};

export default withGoogleOptimize;
