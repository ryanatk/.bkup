import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormattedNumber } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { EventType, sendGTMWithSegmentEvent } from '../../../../analytics';
import { ACTIVE_EXPERIMENT_ID as MEMBERSHIP_EXPERIMENT_ID } from '../../../../consts/experiments/membership';
import { ACTIVE_EXPERIMENT_ID as PDP_EXPERIMENT_ID } from '../../../../consts/experiments/pdp';
import { RingSizeType, RING_SIZE_NOT_SELECTED } from '../../../../consts/ring';
import { useSubPrice } from '../../../../helpers/bilboHelper';
import usePdpDiscountData from '../../../../helpers/discounts/usePdpDiscountData';
import useDidCartUpdate from '../../../../helpers/useDidCartUpdate';
import useGoogleOptimizeVariant, {
  VariantId,
} from '../../../../hooks/useGoogleOptimizeVariant';
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
import Product from '../../../../types/Product';
import { RingSize } from '../../../../types/Ring';
import checkFeatureFlag from '../../../../utils/checkFeatureFlag';
import {
  AffirmPromo,
  BodyLink,
  Button,
  Grid,
  Price,
  SlideshowKaksi,
  Typography,
} from '../../../sormus';
import ExtendedWarrantyModal from '../ExtendedWarrantyModal';
import ProductModalMembership from '../ProductModalMembership';
import ChargerSetOptions from './ChargerSetOptions';
import { abImages, HeritageRings } from './pdpCarouselTest/data';
import styles from './ProductSelect.module.scss';
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

const ProductSelect = ({ product }: ProductSelectProps) => {
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
  const ringHandle: HeritageRings = HeritageRings[product.handle];
  const isHeritageRing = Object.values(HeritageRings).includes(ringHandle);
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
   * PDP Carousel Image Resize A/B Experiment
   */
  const carouselImageResizeTest = checkFeatureFlag('pdp-carousel-image-test');
  const {
    ready: carouselImageResizeTestReady,
    variantId: carouselImageResizeTestVariantId,
  } = useGoogleOptimizeVariant(
    PDP_EXPERIMENT_ID,
    carouselImageResizeTest ? 2000 : 0,
  );

  /**
   * Membership Page A/B Experiment
   */
  const membershipPageTest = checkFeatureFlag('new-membership-page');
  const {
    ready: membershipPageTestReady,
    variantId: membershipPageTestVariantId,
  } = useGoogleOptimizeVariant(
    MEMBERSHIP_EXPERIMENT_ID,
    membershipPageTest ? 2000 : 0,
  );

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
    const cartObject = {
      cart,
      variantId: Number(getVariant(size).id),
      variantParentId: Number(product.id),
      quantity: 1,
      addFreeSizingKit: shouldAddSizingKit(isChargerSet, size),
      extendedWarrantyId: extendedWarrantySelectedId,
    };
    dispatch(cartActions.reqUpdateCartItemsAction(cartObject));
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

  const slideShowImages = isHeritageRing // test is only relevant for heritage ring
    ? carouselImageResizeTestReady
      ? carouselImageResizeTestVariantId === VariantId.One
        ? abImages[ringHandle]
        : product.images
      : [product.images[0]] // provides a default image, for the layout to settle
    : product.images;

  const membershipPageTestControl =
    (membershipPageTestReady && !membershipPageTestVariantId) ||
    membershipPageTestVariantId === VariantId.Zero;

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
              {membershipPageTestControl ? (
                <Button
                  variant="basic"
                  onClick={() => setModal(SUBSCRIPTION)}
                  className="underline"
                  data-cy="button-modal-help"
                >
                  {t('oura_membership')}:
                </Button>
              ) : (
                <span>{t('oura_membership')}: </span>
              )}{' '}
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
                  {membershipPageTestVariantId === VariantId.One && (
                    <>
                      {' '}
                      <Link href="/membership" passHref>
                        <BodyLink color="inherit" target="_blank">
                          {t('pdp_membership_learn_more')}
                        </BodyLink>
                      </Link>
                    </>
                  )}
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
        <div
          className={cx(styles.slideshow, {
            invisible: isHeritageRing && !carouselImageResizeTestReady, // hides the image, to keep a/b test even
          })}
        >
          <SlideshowKaksi
            items={slideShowImages.map((image) => ({
              originalSrc: image.originalSrc,
              responsiveWidths: [800, 600, 400],
              alt: image?.alt ?? '',
              content: () => null,
            }))}
            onNavNext={(index) => handleSlideshowNext(index, asPath)}
            onNavPrev={(index) => handleSlideshowPrev(index, asPath)}
          />
        </div>
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
      {membershipPageTestControl && (
        <ProductModalMembership
          open={modal === SUBSCRIPTION}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ProductSelect;
