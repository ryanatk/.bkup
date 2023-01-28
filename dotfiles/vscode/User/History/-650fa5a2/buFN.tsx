import { ReactElement } from 'react';
import useGoogleOptimizeVariant, {
  VariantId,
} from '../../../hooks/useGoogleOptimizeVariant';

interface GoogleOptimizeProps {
  variant: VariantId;
  experiment: string;
  children: React.ReactElement;
  placeholder?: React.ReactElement;
}

const withGoogleOptimize = (Component: ReactElement) => {
  return function GoogleOptimize({
    variant,
    experiment,
    children,
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
