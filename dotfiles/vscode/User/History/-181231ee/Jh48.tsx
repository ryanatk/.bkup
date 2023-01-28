import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import Checkout from '../../components/pages/checkout';
import CheckoutNew from '../../components/pages/checkoutNew';
import GoogleOptimize, {
  VariantId,
} from '../../components/sormus/GoogleOptimize';
import Redirect from '../../components/sormus/Redirect';
import { ACTIVE_EXPERIMENT_ID } from '../../consts/experiments/giftingFlow';
import { getCartSelector } from '../../stores/cart/selectors';
import { getCheckoutSelector } from '../../stores/checkout/selectors';
import { getCartRingCount } from '../../utils/cartCount';
import checkFeatureFlag from '../../utils/checkFeatureFlag';

const GiftingFlowTest = ({
  children,
  variant,
}: {
  children: ReactNode;
  variant: VariantId;
}) => (
  <GoogleOptimize
    segmentEventProps={{ experimentName: 'Gifting flow' }}
    experimentId={ACTIVE_EXPERIMENT_ID}
    featureFlag="enable-gifting-flow"
    variant={variant}
  >
    {children}
  </GoogleOptimize>
);

const Page = (): JSX.Element => {
  const checkout = useSelector(getCheckoutSelector);
  const cart = useSelector(getCartSelector);

  const isMultilineEnabled = checkFeatureFlag('enable-multi-line-items');

  if (checkout.order?.status?.success) {
    return <Redirect path="/checkout/summary" />;
  }

  if (!checkout || (!checkout.initiated && !checkout.order))
    return <Redirect path="/cart" />;

  const MAX_RINGS_PER_ORDER = isMultilineEnabled ? 10 : 1;

  if (cart && getCartRingCount(cart) > MAX_RINGS_PER_ORDER)
    return <Redirect path="/cart" />;

  return (
    <>
      <GiftingFlowTest variant={VariantId.One}>
        <Checkout />
      </GiftingFlowTest>
      <GiftingFlowTest variant={VariantId.Zero}>
        <CheckoutNew />
      </GiftingFlowTest>
    </>
  );
};

Page.pageName = 'Checkout';
Page.isSormusCompatible = true;

export default Page;
