import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormattedNumber } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { EventType, sendGTMWithSegmentEvent } from '../../../../analytics';
import { ACTIVE_EXPERIMENT_ID as MEMBERSHIP_EXPERIMENT_ID } from '../../../../consts/experiments/membership';
import { ACTIVE_EXPERIMENT_ID as MEMBERSHIP_PRICE_ID } from '../../../../consts/experiments/membershipPrice';
import { RingSizeType, RING_SIZE_NOT_SELECTED } from '../../../../consts/ring';
import { useSubPrice } from '../../../../helpers/bilboHelper';
import usePdpDiscountData from '../../../../helpers/discounts/usePdpDiscountData';
import useDidCartUpdate from '../../../../helpers/useDidCartUpdate';
import { CHARGER_SET } from '../../../../pages/product/[handle]';
import { t } from '../../../../public/locales/LocaleContext';
import { useProductByHandle } from '../../../../queries/Products';
import { reqAnalyticsEvent } from '../../../../stores/app/actions';
import {
  getCountryCodeSelector,
  getCurrencySelector,
} from '../../../../stores/app/selectors';
import cartActions from '../../../../stores/cart/actions';
import { getCartSelector } from '../../../../stores/cart/selectors';
import { CartLineItem } from '../../../../types/CartState';
import Product from '../../../../types/Product';
import { RingSize } from '../../../../types/Ring';
import { isCharger } from '../../../../utils/cartCount';
import checkFeatureFlag from '../../../../utils/checkFeatureFlag';
import {
  AffirmPromo,
  BodyLink,
  Button,
  Grid,
  Price,
  Typography,
} from '../../../sormus';
import GoogleOptimize, { VariantId } from '../../../sormus/GoogleOptimize';
import ExtendedWarrantyModal from '../ExtendedWarrantyModal';
import ProductModalMembership from '../ProductModalMembership';
import ChargerSetOptions from './ChargerSetOptions';
import styles from './ProductSelect.module.scss';
import ProductSlideshow from './ProductSlideshow';
import RingOptions, { isValidRingSizeSelection } from './RingOptions';

const EXTENDED_WARRANTY = 'warranty-choice';
const SUBSCRIPTION = 'subscription';
const LIFETIME = 'lifetime';

interface ProductSelectProps {
  product: Product;
}

type CarouselAnalyticsPayload = {
  carouselTitle: string;
  slide: number;
  direction: 'prev' | 'next';
  path: string;
};

const handleAnalytics = (
  event: EventType,
  params: CarouselAnalyticsPayload,
) => {
  sendGTMWithSegmentEvent({
    type: event,
    payload: params,
  });
};

export const shouldAddSizingKit = (isChargerSet = false, size: RingSize) =>
  !isChargerSet && (!size || size === RING_SIZE_NOT_SELECTED) ? true : false;

const handleSlideshowPrev = (index: number, path: string) =>
  handleAnalytics(EventType.CarouselArrowClicked, {
    carouselTitle: 'pdp_ring',
    slide: index,
    direction: 'prev',
    path,
  });

const handleSlideshowNext = (index: number, path: string) =>
  handleAnalytics(EventType.CarouselArrowClicked, {
    carouselTitle: 'pdp_ring',
    slide: index,
    direction: 'next',
    path,
  });

interface MembershipTestProps {
  variant: VariantId;
  children?: any;
  waiting?: React.ReactElement;
  elseRender?: React.ReactElement;
}

const MembershipPriceTest = ({
  variant,
  children,
  waiting,
  elseRender,
}: MembershipTestProps) => (
  <GoogleOptimize
    experimentId={MEMBERSHIP_PRICE_ID}
    featureFlag="membership-price-test"
    variant={variant}
    waiting={waiting}
    elseRender={elseRender}
  >
    {children}
  </GoogleOptimize>
);

const MembershipTest = ({
  variant,
  children,
  waiting,
  elseRender,
}: MembershipTestProps) => (
  <GoogleOptimize
    experimentId={MEMBERSHIP_EXPERIMENT_ID}
    featureFlag="new-membership-page"
    variant={variant}
    waiting={waiting}
    elseRender={elseRender}
  >
    {children}
  </GoogleOptimize>
);

const ProductSelect = ({ product }: ProductSelectProps): JSX.Element => {
  const dispatch = useDispatch();
  const cart = useSelector(getCartSelector);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(RING_SIZE_NOT_SELECTED);
  const [ringSizeType, setRingSizeType] = useState(RingSizeType.later);
  const [extendedWarrantyId, setExtendedWarrantyId] = useState(null);

  const [disableButton, setDisableButton] = useState(false);
  const router = useRouter();
  const { asPath } = router;
  const isChargerSet = product.handle === CHARGER_SET;
  const hasPrice = product.price && product.price.amount;
  const extendedWarrantyFlag = checkFeatureFlag('extended-warranty');
  const countryCode = useSelector(getCountryCodeSelector);
  const [modal, setModal] = useState('');
  const currencyCode = useSelector(getCurrencySelector);
  const {
    price: discountAmount,
    discountPercentage,
    discount: discountObject,
  } = usePdpDiscountData();
  const { data: subscriptionProduct } = useProductByHandle('subscription');
  const comparePrice = subscriptionProduct && subscriptionProduct.comparePrice;

  /**
   * Control ability to add to cart based on ring size selection
   */
  useEffect(() => {
    if (isValidRingSizeSelection(ringSizeType, size)) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [size, ringSizeType]);

  /**
   * Reset size to not selected on ring size type "later" change
   */
  useEffect(() => {
    if (ringSizeType === RingSizeType.later) setSize(RING_SIZE_NOT_SELECTED);
  }, [ringSizeType]);

  const getVariant = (size) => {
    const valueToTest = size ? size.toString() : RING_SIZE_NOT_SELECTED;
    const selectedVariant = product.variants.find(
      (v) =>
        v.selectedOptions.find((o) => o.name === 'Size').value === valueToTest,
    );
    return selectedVariant;
  };
  /**
   * Watch for update from extended warranty modal
   */
  useEffect(() => {
    if (extendedWarrantyId) {
      handleProceedToCart();
    }
  }, [extendedWarrantyId]);

  /**
   * ensure that add to cart button is disabled if charger set and size isn't selected
   */
  useEffect(() => {
    if (isChargerSet && size === RING_SIZE_NOT_SELECTED) setDisableButton(true);
  }, [size, isChargerSet]);

  const handleCloseModal = () => {
    setModal('');
    setLoading(false);
  };

  const handleProceedToCart = () => {
    setLoading(true);
    const extendedWarrantySelectedId =
      extendedWarrantyId && extendedWarrantyId > 1 ? extendedWarrantyId : null;
    const variantId = Number(getVariant(size).id);
    const lineItem = cart.lineItems.find(({ id }) => Number(id) === variantId);

    dispatch(
      cartActions.reqUpdateCartItemsAction({
        cart,
        variantId,
        variantParentId: Number(product.id),
        quantity: getNewQuantity(lineItem),
        addFreeSizingKit: shouldAddSizingKit(isChargerSet, size),
        extendedWarrantyId: extendedWarrantySelectedId,
      }),
    );
    dispatch(
      reqAnalyticsEvent({ type: EventType.ProductAdded, payload: { product } }),
    );
  };

  const handleAddToCart = () => {
    if (countryCode === 'US' && extendedWarrantyFlag && !isChargerSet) {
      setModal(EXTENDED_WARRANTY);
    } else {
      handleProceedToCart();
    }
  };

  useDidCartUpdate(() => {
    router.push('/cart');
  });

  const getAffirmPrice = () => {
    if (hasPrice && discountAmount)
      return Math.round((product.price.amount - discountAmount) * 100);
    return Math.round(product.price.amount * 100);
  };

  const getDiscountAmount = () => {
    if (discountPercentage && discountPercentage == 100) return hasPrice;
    else return discountAmount;
  };

  const discount = getDiscountAmount();
  const affirmPrice = getAffirmPrice();
  const subscriptionPrice = useSubPrice(comparePrice);
  const grantSubscription = discountObject?.grantSubscription;

  return (
    <>
      <Grid className="pb-16 justify-start gap-y-2.5 md:gap-y-10">
        <div className={styles.headline}>
          <Typography variant="h3" Element="h1">
            {isChargerSet ? t('charger_set_gen_3') : t('ring_gen_3')}
          </Typography>
          <Typography Element="div" variant="h6" className="mt-4">
            <Price price={hasPrice} discount={discount} priceCompare />
          </Typography>
          <AffirmPromo
            pageType="cart"
            price={affirmPrice}
            footnote={
              <sup>
                <a href="#legal-footnotes">†</a>
              </sup>
            }
          />

          {extendedWarrantyFlag && !isChargerSet && (
            <Typography
              Element="div"
              className="mt-1"
              variant="eyebrow"
              data-cy="teaser-box-preorder"
            >
              <MembershipTest
                waiting={<span>{t('oura_membership')}: </span>}
                elseRender={<span>{t('oura_membership')}: </span>}
                variant={VariantId.Zero}
              >
                <Button
                  variant="basic"
                  onClick={() => setModal(SUBSCRIPTION)}
                  className="underline"
                  data-cy="button-modal-help"
                >
                  {t('oura_membership')}:
                </Button>
              </MembershipTest>{' '}
              {grantSubscription === LIFETIME ? (
                <Typography
                  variant="eyebrow"
                  Element="div"
                  data-cy="teaser-box-lifetime-membership"
                >
                  {t('free_membership_included')}
                </Typography>
              ) : (
                <>
                  {t('checkout_additional_details_subs_1')}

                  <MembershipPriceTest variant={VariantId.One}>
                    <span>
                      {' '}
                      (
                      {t('subscription_value', {
                        amount: (
                          <span data-cy="teaser-oura-membership-amount">
                            <FormattedNumber
                              value={subscriptionPrice * 6}
                              style="currency"
                              currency={currencyCode}
                            />
                          </span>
                        ),
                      })}
                      )
                    </span>
                  </MembershipPriceTest>
                  <MembershipTest variant={VariantId.One}>
                    {' '}
                    <Link href="/membership" passHref>
                      <BodyLink color="inherit" target="_blank">
                        {t('pdp_membership_learn_more')}
                      </BodyLink>
                    </Link>
                  </MembershipTest>

                  <Typography variant="eyebrow" Element="div">
                    {t('subscription_monthly_amount', {
                      amount: (
                        <span data-cy="teaser-oura-membership-amount">
                          <FormattedNumber
                            value={subscriptionPrice}
                            style="currency"
                            currency={currencyCode}
                          />
                        </span>
                      ),
                    })}
                  </Typography>
                </>
              )}
            </Typography>
          )}
        </div>

        <ProductSlideshow
          className={styles.slideshow}
          product={product}
          onNavNext={(index) => handleSlideshowNext(index, asPath)}
          onNavPrev={(index) => handleSlideshowPrev(index, asPath)}
        />

        <div className={styles.selector}>
          {isChargerSet ? (
            <ChargerSetOptions size={size} setSize={setSize} />
          ) : (
            <RingOptions
              setRingSize={setSize}
              ringSize={size}
              ringSizeType={ringSizeType}
              setRingSizeType={setRingSizeType}
              setExtendedWarrantySelection={setExtendedWarrantyId}
            />
          )}
          <Button
            variant="primary"
            loading={loading}
            className="mt-5 md:mt-8 w-full"
            disabled={disableButton}
            onClick={handleAddToCart}
            data-cy="button-add-to-cart"
          >
            {t('pdp_add_to_cart')}
          </Button>
        </div>
      </Grid>
      <ExtendedWarrantyModal
        open={modal === EXTENDED_WARRANTY}
        onClose={handleCloseModal}
        updateExtendedWarranty={setExtendedWarrantyId}
      />
      <MembershipTest variant={VariantId.Zero}>
        <ProductModalMembership
          open={modal === SUBSCRIPTION}
          onClose={handleCloseModal}
        />
      </MembershipTest>
    </>
  );
};

// util to get the new quantity for adding to cart
export function getNewQuantity(lineItem: CartLineItem): number {
  // currently only chargers are added cumulatively
  const isCumulative = isCharger(lineItem);

  const original = isCumulative ? lineItem?.quantity ?? 0 : 0;
  console.log({ original });
  const quantity = original + 1;

  return quantity;
}

export default ProductSelect;
