import useGoogleOptimizeVariant, {
  VariantId,
} from '../../../hooks/useGoogleOptimizeVariant';

interface GoogleOptimizeProps {
  variant: VariantId;
  experiment: string;
  children: React.ReactElement;
}

const GoogleOptimize = ({
  variant,
  experiment,
  children,
}: GoogleOptimizeProps): JSX.Element => {
  const { ready, variantId } = useGoogleOptimizeVariant(experiment);
  const timedOut = variant === VariantId.Zero && !variantId && ready;

  if (timedOut || variant === variantId) {
    return children;
  } else {
    return <></>;
  }
};

export default GoogleOptimize;
