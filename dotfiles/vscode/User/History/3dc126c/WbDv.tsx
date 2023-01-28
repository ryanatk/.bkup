import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
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
import { getCartIconCount, getCartRingCount } from '../../utils/cartCount';
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

  // console.log({ cart });

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

  const cartHasItems = cart?.totalCount > 0;

  const tooManyCartRings = getCartRingCount(cart) > MAX_RINGS_PER_ORDER;

  const tooManyCartItems = getCartIconCount(cart) > MAX_CHARGERS_PER_ORDER;

  const quantityMessage = useMemo(() => {
    if (cartHasItems && !isMultiLineEnabled) {
      return 'cart_one_item_per_order';
    }
  }, [cartHasItems, isMultiLineEnabled]);

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
                  tooManyCartItems={tooManyCartItems}
                  onCheckoutClick={handleCheckout}
                />

                {cartHasItems && !isMultiLineEnabled && (
                  <div className="pt-6">
                    <Alert
                      severity="info"
                      data-cy="cart-error"
                      textColor="helsinkiBlue"
                    >
                      <Typography>{t('cart_one_item_per_order')}</Typography>
                    </Alert>
                  </div>
                )}

                {tooManyCartItems && !isChargerSetDisabled && (
                  <div className="py-6">
                    <Alert
                      severity="info"
                      data-cy="cart-error-max"
                      textColor="helsinkiBlue"
                    >
                      <Typography>
                        {t('cart_max_items_per_order', {
                          max: MAX_CHARGERS_PER_ORDER,
                        })}
                      </Typography>
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
                  tooManyCartItems={tooManyCartRings}
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
