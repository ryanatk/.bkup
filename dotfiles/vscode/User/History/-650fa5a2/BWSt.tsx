import useGoogleOptimizeVariant, {
  VariantId,
} from '../../../hooks/useGoogleOptimizeVariant';

export interface GoogleOptimizeProps {
  variant: VariantId;
  experiment: string;
  placeholder?: React.ReactElement;
}

const withGoogleOptimize = (Component: React.FunctionComponent) => {
  const GoogleOptimize = ({
    variant,
    experiment,
    placeholder,
    ...props
  }: GoogleOptimizeProps): JSX.Element => {
    const { ready, variantId } = useGoogleOptimizeVariant(experiment);

    if (ready && variant === variantId) {
      return <Component {...props} />;
    }

    return placeholder ?? <></>;
  };

  return GoogleOptimize;
};

export default withGoogleOptimize;
