import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EventType } from '../../analytics';
import CartLineItems from '../../components/pages/cart/CartLineItems';
import CartTableFooter from '../../components/pages/cart/CartTableFooter';
import CartTableHeader from '../../components/pages/cart/CartTableHeader';
import BilboLegalFootnotes from '../../components/pages/_global/BilboLegalFootnotes';
import {
  Footer,
  Grid,
  Header,
  PageContainer,
  Typography,
} from '../../components/sormus';
import Alert from '../../components/sormus/Alert';
import { MAX_QUANTITY } from '../../consts/cart';
import fetchPageDetails from '../../data-mock/api/fetch-page-details';
import { t } from '../../public/locales/LocaleContext';
import { reqAnalyticsEvent } from '../../stores/app/actions';
import { reqReloadCartAction } from '../../stores/cart/actions';
import cartSelector from '../../stores/cart/selectors';
import { reqInitCheckoutAction } from '../../stores/checkout/actions';
import { getCartRingCount } from '../../utils/cartCount';
import checkFeatureFlag from '../../utils/checkFeatureFlag';
import { setFeatureFlagCookie } from '../../utils/featureFlagCookie';
import { reportClick } from '../../utils/reportMetrics';

const CartPage = ({ details }): JSX.Element => {
  const cart = useSelector(cartSelector.getCartSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const isMultiLineEnabled = checkFeatureFlag('enable-multi-line-items');
  const isFreeShippingEnabled = checkFeatureFlag('free-shipping-messaging');
  const isChargerSetDisabled = checkFeatureFlag('hide-charger-set');

  const MAX_RINGS_PER_ORDER = isMultiLineEnabled ? MAX_QUANTITY : 1;
  const MAX_CHARGERS_PER_ORDER = isChargerSetDisabled ? 1 : MAX_QUANTITY;

  const cartHasItems = cart?.totalCount > 0;

  const ringCount = getCartRingCount(cart);
  const tooManyCartRings = ringCount > MAX_RINGS_PER_ORDER;
  const chargerCount = getCartRingCount(cart);
  const tooManyCartChargers = ringCount > MAX_CHARGERS_PER_ORDER;
  const tooManyCartItems = tooManyCartRings || tooManyCartChargers;

  const getQuantityMessage = (hasRings, hasChargers) => {
    if (hasRings && hasChargers) {
      return t('cart_max_items_per_order', {
        max: MAX_CHARGERS_PER_ORDER,
      });
    }

    if (hasRings) {
      return t('cart_max_items_per_order', {
        max: MAX_CHARGERS_PER_ORDER,
      });
    }

    if (hasChargers) {
      return t('cart_one_item_per_order');
    }
  };
  const quantityMessage = getQuantityMessage(
    Boolean(ringCount),
    Boolean(chargerCount),
  );

  /* 
    Hook must be called in Function component. 
    Set cookie so can be used in checkoutService util function 
  */
  setFeatureFlagCookie('free-shipping-messaging', isFreeShippingEnabled);

  useEffect(() => {
    dispatch(reqInitCheckoutAction({}));
    // Reload cart to re-run calculate totals based on free products that may have been auto-added e.g. sizing kit
    dispatch(reqReloadCartAction({ cart }));
    dispatch(reqAnalyticsEvent({ type: EventType.CartViewed, payload: {} }));
  }, []); // run once

  const handleCheckout = () => {
    reportClick('checkout');
    dispatch(
      reqAnalyticsEvent({ type: EventType.CheckoutStarted, payload: {} }),
    );
    router.push('/checkout');
  };

  return (
    <>
      <NextSeo {...details.seoParams} />

      <div className="tailwind">
        <div className="bg-white">
          <Header bordered shopButton={false} hideLinks={true} />
          <PageContainer name="cart" className="bg-white">
            <Grid>
              <div className="col-main lg:mx-24">
                <CartTableHeader
                  cartHasItems={cartHasItems}
                  tooManyCartItems={tooManyCartRings}
                  onCheckoutClick={handleCheckout}
                />

                {quantityMessage && (
                  <div className="pt-6">
                    <Alert
                      severity="info"
                      data-cy="cart-error"
                      textColor="helsinkiBlue"
                    >
                      <Typography>{quantityMessage}</Typography>
                    </Alert>
                  </div>
                )}

                {!cart ? (
                  <Typography className="text-center">
                    {t('loading')}
                  </Typography>
                ) : (
                  <CartLineItems lineItems={cart.lineItems} />
                )}

                <CartTableFooter
                  cart={cart}
                  cartHasItems={cartHasItems}
                  onClickCheckout={handleCheckout}
                  tooManyCartItems={tooManyCartItems}
                />
              </div>
            </Grid>
          </PageContainer>
        </div>
        {cartHasItems && <BilboLegalFootnotes pageName="cart" />}
        <Footer />
      </div>
    </>
  );
};

CartPage.getInitialProps = async ({ asPath }) => {
  const details = await fetchPageDetails('product');
  return { details, asPath };
};

CartPage.isSormusCompatible = true;
CartPage.pageName = 'CartPage';
export default CartPage;
