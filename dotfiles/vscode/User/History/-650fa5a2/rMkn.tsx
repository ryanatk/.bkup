import useGoogleOptimizeVariant, {
  VariantId,
} from '../../../hooks/useGoogleOptimizeVariant';

export interface GoogleOptimizeProps {
  variant: VariantId;
  experiment: string;
  placeholder?: React.ReactElement;
}

const withGoogleOptimize = (Component: React.FunctionComponent) => {
  return function GoogleOptimize({
    variant,
    experiment,
    placeholder,
    ...props
  }: GoogleOptimizeProps): JSX.Element {
    const { ready, variantId } = useGoogleOptimizeVariant(experiment);
    const timedOut = variant === VariantId.Zero && !variantId && ready;

    if (timedOut || variant === variantId) {
      return <Component {...props} />;
    }

    return placeholder ?? <></>;
  };
};

export default withGoogleOptimize;
