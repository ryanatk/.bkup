import { css } from '@emotion/react';
import { CircularProgress, useMediaQuery } from '@material-ui/core';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EventType } from '../../analytics/types';
import OrderSummaryText from '../../components/pages/summary/OrderSummaryText';
import {
  Box,
  Footer,
  Header,
  MainContent,
  PageContainer,
  Typography,
} from '../../components/sormus';
import CheckoutOrderTable from '../../components/sormus/CheckoutOrderTable';
import { breakpoints } from '../../components/sormus/constants';
import { QualtricsSnippet } from '../../components/sormus/Qualtrics/QualtricsSnippet';
import usePdpDiscountData from '../../helpers/discounts/usePdpDiscountData';
import useHeroHeader from '../../hooks/useHeroHeader';
import { t } from '../../public/locales/LocaleContext';
import { useDiscount } from '../../queries/GetOneDiscount';
import { reqAnalyticsEvent } from '../../stores/app/actions';
import { reqCleanCheckoutOnSuccessSaga } from '../../stores/checkout/actions';
import { getCheckoutSelector } from '../../stores/checkout/selectors';
import CheckoutState from '../../types/CheckoutState';
import { formatAddressSingleLine } from '../../utils/formatAddress';
import getCohort, { REPLACEMENT } from '../../utils/getBilboCohort';
import { backgroundImage } from '../../utils/imageHelpers';
import styles from './summary.module.scss';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

interface CheckoutSummaryProps {
  order: CheckoutState;
}

const getOrderDiscountCode = (cart) => {
  const { discounts } = cart;
  const discount = discounts.filter((discountObj) => discountObj !== false);
  if (discount && discount.length > 0) return discount[0].code;
  return null;
};

const CheckoutSummary: FC<CheckoutSummaryProps> = ({ order }) => {
  const isMinWidthMedium = useMediaQuery(`(min-width:${breakpoints.medium}px)`);
  const dispatch = useDispatch();
  const { data: discountData, isLoading: discountLoading } = useDiscount(
    getOrderDiscountCode(order.cart),
  );

  const { headerRef, headerHeight } = useHeroHeader();

  const { shippingAddress, shippingRate } = order;
  const { campaign } = usePdpDiscountData();
  const cohort = getCohort(campaign);

  useEffect(() => {
    if (!order.status || !order.status.success) return;
    else {
      dispatch(reqCleanCheckoutOnSuccessSaga());
    }
  }, []);

  useEffect(() => {
    if (order && order.id) {
      /**
       * Only fire data layer event, if the total discount is greater than $5
       * This removes the event from firing if only the sizing kit is a discount
       */
      if (order.totalDiscount && order.totalDiscount > 5) {
        window.dataLayer = window.dataLayer || [];

        window.dataLayer.push('event', 'order', {
          event_category: 'ecomtracking',
          event_label: 'discountvalue',
          value: order.totalDiscount,
        });
      }

      dispatch(
        reqAnalyticsEvent({
          type: EventType.CheckoutNewStepCompleted,
          payload: { payment_method: order.gateway, step: 4 },
        }),
      );
    }
  }, [order]);

  let selectedPaymentMethod = 'Card';
  if (order.gateway) {
    if (order.gateway.includes('paypal')) {
      selectedPaymentMethod = 'PayPal';
    } else if (order.gateway.includes('affirm')) {
      selectedPaymentMethod = 'Affirm';
    }
  }

  let discount;
  if (discountData) {
    discount = discountData.discount;
  }

  if (!order || discountLoading)
    return (
      <div className="pl-4">
        <div className="flex justify-center content-center gap-2">
          <div>
            <CircularProgress size={20} />
          </div>
          <div>
            <Typography>{t('loading')}</Typography>
          </div>
        </div>
      </div>
    );

  return (
    <div className="tailwind" data-cy="checkout-summary-view">
      <Header inverse ref={headerRef} />

      <MainContent>
        <QualtricsSnippet />
        <PageContainer name="order-confirmation" padding="bottom">
          <div
            className={styles.hero}
            css={css`
              margin-top: -${headerHeight}px;
              background-size: cover;
              background-position: ${isMinWidthMedium
                ? 'center'
                : 'center bottom'};
              ${{
                ...backgroundImage(
                  isMinWidthMedium
                    ? 'checkout/order-summary-rings-hero-desktop'
                    : 'checkout/order-summary-rings-hero-mobile',
                  isMinWidthMedium ? 1600 : 600,
                  'png',
                ),
              }}
            `}
          >
            <Box className="text-white">
              <div className={styles.heroText}>
                <Typography
                  variant="h1"
                  Element="h1"
                  color="inherit"
                  data-cy="summary-thank-you"
                >
                  {t('checkout_summary_thank_you')}
                </Typography>
                <Typography variant="h3" Element="h2" color="inherit">
                  {cohort !== REPLACEMENT &&
                    (order.isGift
                      ? t('checkout_summary_gift_order_placed')
                      : t('checkout_summary_order_placed'))}
                </Typography>
              </div>
            </Box>
          </div>
          <Box className="max-w-6xl">
            <div className="mb-10">
              <OrderSummaryText order={order} discount={discount} />
            </div>
            <Typography
              variant="h4"
              Element="h3"
              className="border-b border-sand-dark pb-2 mb-4"
            >
              {t('checkout_summary_order_details')}
            </Typography>
            <div id="section-order-shipping-address">
              <div className="flex-col flex md:flex-row md:gap-4">
                <Typography>
                  {t('checkout_summary_recipient')}:
                  <Typography
                    variant="body2"
                    Element="span"
                    className="ml-2"
                    color="grayscale-dark"
                  >
                    {shippingAddress.fname} {shippingAddress.lname}
                  </Typography>
                </Typography>
                <Typography>
                  {t('checkout_summary_phone')}:
                  <Typography
                    variant="body2"
                    Element="span"
                    className="ml-2"
                    color="grayscale-dark"
                  >
                    {shippingAddress.phone}
                  </Typography>
                </Typography>
              </div>
              <Typography>
                {t('checkout_summary_shipping_address')}:
                <Typography
                  variant="body2"
                  Element="span"
                  className="ml-2"
                  color="grayscale-dark"
                >
                  {formatAddressSingleLine(shippingAddress)}
                </Typography>
              </Typography>
              <Typography>
                {t('checkout_summary_billing_address')}:
                <Typography
                  variant="body2"
                  Element="span"
                  className="ml-2"
                  color="grayscale-dark"
                >
                  {formatAddressSingleLine(order.billingAddress) ||
                    'Same as shipping'}
                </Typography>
              </Typography>
            </div>

            <div
              id="section-order-details"
              className="border-t border-sand-dark mt-8 pt-4"
            >
              <CheckoutOrderTable checkout={order} cart={order.cart} />
            </div>
          </Box>
        </PageContainer>
      </MainContent>

      <div className="border-t border-sand-dark">
        <Footer />
      </div>
    </div>
  );
};

const Page = () => {
  const checkout = useSelector(getCheckoutSelector);

  if (checkout.isLoading) return null;

  const { order } = checkout;

  if (!order) return null;
  return <CheckoutSummary order={order} />;
};

Page.pageName = 'Checkout Summary';
Page.isSormusCompatible = true;

export default Page;
