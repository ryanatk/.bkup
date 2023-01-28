import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EventType } from '../../analytics';
import CartLineItems from '../../components/pages/cart/CartLineItems';
import CartQuantityAlert from '../../components/pages/cart/CartQuantityAlert';
import CartTableFooter from '../../components/pages/cart/CartTableFooter';
import CartTableHeader from '../../components/pages/cart/CartTableHeader';
import BilboLegalFootnotes from '../../components/pages/_global/BilboLegalFootnotes';
import {
  Footer,
  Grid,
  Header,
  MainContent,
  PageContainer,
  Typography,
} from '../../components/sormus';
import { MAX_QUANTITY } from '../../consts/cart';
import fetchPageDetails from '../../data-mock/api/fetch-page-details';
import { t } from '../../public/locales/LocaleContext';
import { reqAnalyticsEvent } from '../../stores/app/actions';
import { reqReloadCartAction } from '../../stores/cart/actions';
import cartSelector from '../../stores/cart/selectors';
import {
  reqInitCheckoutAction,
  reqUpdateCheckoutCartAction,
} from '../../stores/checkout/actions';
import { getCheckoutSelector } from '../../stores/checkout/selectors';
import { getCartChargerCount, getCartRingCount } from '../../utils/cartCount';
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
  const checkout = useSelector(getCheckoutSelector);

  const maxRingsPerOrder = isMultiLineEnabled ? MAX_QUANTITY : 1;
  const maxChargersPerOrder = isChargerSetDisabled ? 0 : MAX_QUANTITY;

  const { cartHasItems, ringCount, chargerCount } = useMemo(() => {
    return {
      cartHasItems: cart?.totalCount > 0,
      ringCount: getCartRingCount(cart),
      chargerCount: getCartChargerCount(cart),
    };
  }, [cart]);

  const isTooManyCartItems = useMemo(() => {
    const isTooManyRings = ringCount > maxRingsPerOrder;
    const isTooManyChargers = chargerCount > maxChargersPerOrder;

    return isTooManyRings || isTooManyChargers;
  }, [ringCount, chargerCount, maxRingsPerOrder, maxChargersPerOrder]);

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

  useEffect(() => {
    dispatch(
      reqUpdateCheckoutCartAction({
        checkout,
        cart,
      }),
    );
  }, [cart.lineItems]);

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
        <Header bordered shopButton={false} hideLinks={true} />

        <MainContent>
          <div className="bg-white">
            <PageContainer name="cart" className="bg-white">
              <Grid>
                <div className="col-main lg:mx-24">
                  <CartTableHeader cartHasItems={cartHasItems} />

                  <CartQuantityAlert
                    hasRings={Boolean(ringCount)}
                    hasChargers={Boolean(chargerCount)}
                    maxRings={maxRingsPerOrder}
                    maxChargers={maxChargersPerOrder}
                  />

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
                    tooManyCartItems={isTooManyCartItems}
                  />
                </div>
              </Grid>
            </PageContainer>
          </div>
          {cartHasItems && <BilboLegalFootnotes pageName="cart" />}
        </MainContent>

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
