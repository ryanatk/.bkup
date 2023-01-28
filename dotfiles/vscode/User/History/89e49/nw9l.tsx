import { useRouter } from 'next/router';
import { ChangeEvent, ReactElement, SetStateAction, useState } from 'react';
import { FormattedNumber, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { EventType, sendGTMWithSegmentEvent } from '../../../../analytics';
import { ACTIVE_EXPERIMENT_ID } from '../../../../consts/experiments/sizingTable';
import {
  RingSizeType,
  RING_SIZES,
  RING_SIZE_NOT_SELECTED,
} from '../../../../consts/ring';
import { useSubPrice } from '../../../../helpers/bilboHelper';
import usePdpDiscountData from '../../../../helpers/discounts/usePdpDiscountData';
import useGoogleOptimizeVariant from '../../../../hooks/useGoogleOptimizeVariant';
import { t } from '../../../../public/locales/LocaleContext';
import { MessageKey } from '../../../../public/locales/setup';
import { useProductByHandle } from '../../../../queries/Products';
import { getCurrencySelector } from '../../../../stores/app/selectors';
import { getDiscountsSelector } from '../../../../stores/discounts/selectors';
import { RingSize } from '../../../../types/Ring';
import checkFeatureFlag from '../../../../utils/checkFeatureFlag';
import getCohort, {
  LESS_THAN_30,
  REPLACEMENT,
  UPGRADER,
} from '../../../../utils/getBilboCohort';
import getCurrencySymbol from '../../../../utils/getCurrencySymbol';
import { srcSet } from '../../../../utils/imageHelpers';
import { Swatch, TeaserBox, Typography } from '../../../sormus';
import GoogleOptimize, { VariantId } from '../../../sormus/GoogleOptimize';
import ProductModalMembership from '../ProductModalMembership';
import ProductModalRingSizing from '../ProductModalRingSizing';
import styles from './ProductSelect.module.scss';
import SizeSelector from './SizeSelector';
import SizeSelectorVariant from './SizeSelectorVariant';

const GO_EXPERIMENT_NAME = 'PDP Sizing Table Modal';

const COLORS = [
  {
    handle: 'heritage-silver',
    img: 'product/ring-swatch-silver',
    label: 'pdp_ring_color_silver_label',
    description: 'pdp_ring_color_silver_description',
  },
  {
    handle: 'heritage-black',
    img: 'product/ring-swatch-black',
    label: 'pdp_ring_color_black_title',
    description: 'pdp_ring_color_black_description',
  },
  {
    handle: 'heritage-stealth',
    img: 'product/ring-swatch-stealth',
    label: 'pdp_ring_color_stealth_title',
    description: 'pdp_ring_color_stealth_description',
  },
  {
    handle: 'heritage-gold',
    img: 'product/ring-swatch-gold',
    label: 'pdp_ring_color_gold_title',
    description: 'pdp_ring_color_gold_description',
  },
];

const RING_SIZING = 'ring-sizing';
const LIFETIME = 'lifetime';

const SizingTableTest = ({ children, variant }) => (
  <GoogleOptimize
    segmentEventProps={{ experimentName: GO_EXPERIMENT_NAME }}
    experimentId={ACTIVE_EXPERIMENT_ID}
    featureFlag="sizing-table-test"
    variant={variant}
  >
    {children}
  </GoogleOptimize>
);

const getTeaserBoxTitle = (cohort: string): MessageKey => {
  if (cohort === UPGRADER) return 'upgrade_benefits';
  return 'oura_membership';
};

const getTeaserBoxDataCy = (
  cohort: string,
  campaign?: string,
  grantSubscription?: string,
) => {
  if (grantSubscription === LIFETIME) return `teaser-box-lifetime-membership`;
  if (campaign === LESS_THAN_30) return `teaser-box-${campaign}`;
  return `teaser-box-${cohort}`;
};
const getTeaserBoxText = (
  subscriptionPrice: number,
  currencyCode: string,
  discountAmount: number,
  cohort: string,
  campaign?: string,
  grantSubscription?: string,
): ReactElement => {
  if (grantSubscription === LIFETIME) return t('free_membership_included');
  if (campaign === LESS_THAN_30) return t('free_upgrade_benefits_details');
  if (cohort === UPGRADER)
    return t('upgrade_benefits_details', {
      amount: (
        <span data-cy="teaser-oura-discount-amount">
          {`${getCurrencySymbol(currencyCode)}${discountAmount}`}
        </span>
      ),
    });
  else
    return t('cart_subscription_item_description', {
      price: (
        <span data-cy="teaser-oura-membership-amount">
          <FormattedNumber
            value={subscriptionPrice}
            style="currency"
            currency={currencyCode}
          />
        </span>
      ),
    });
};

interface RingOptionsProps {
  addToCartButton: JSX.Element;
  onDisableButton: (val: boolean) => void;
  setRingSize: (value: SetStateAction<string>) => void;
  ringSize: string;
}
/**
 * Determine if ring is a valid size
 */
export const isValidRingSize = (ringSize: RingSize | string) =>
  RING_SIZES.includes(ringSize) ? true : false;

/**
 * Determine is size type and selection are valid
 */
export const isValidRingSizeSelection = (
  ringSizeType: RingSizeType,
  ringSize: RingSize | string = RING_SIZE_NOT_SELECTED,
) => (ringSizeType === RingSizeType.now ? isValidRingSize(ringSize) : true);

type ModuleAnalyticsPayload = {
  cta: string;
  location: string;
};

const RingOptions = ({
  addToCartButton,
  onDisableButton,
  setRingSize,
  ringSize,
}: RingOptionsProps) => {
  const { data: subscriptionProduct } = useProductByHandle('subscription');
  const [modal, setModal] = useState('');
  const showSizeSelector = checkFeatureFlag('pdp-size-selector');
  const extendedWarrantyFlag = checkFeatureFlag('extended-warranty');
  const comparePrice = subscriptionProduct && subscriptionProduct.comparePrice;
  const currencyCode = useSelector(getCurrencySelector);

  const { formatMessage } = useIntl();

  const membershipPriceTest = checkFeatureFlag('sizing-table-test');
  const { ready, variantId } = useGoogleOptimizeVariant(
    ACTIVE_EXPERIMENT_ID,
    membershipPriceTest ? 2000 : 0,
    { experimentName: GO_EXPERIMENT_NAME },
  );

  const subscriptionPrice = useSubPrice(comparePrice);
  const {
    price: discountAmount,
    campaign,
    discount: discountObject,
  } = usePdpDiscountData();
  const router = useRouter();
  const { query, asPath } = router;
  const cohort = getCohort(campaign);

  const handleAnalytics = (
    event: EventType,
    params: ModuleAnalyticsPayload,
  ) => {
    sendGTMWithSegmentEvent({
      type: event,
      payload: {
        ...params,
        path: asPath,
      },
    });
  };

  const handleCloseModal = () => setModal('');
  const handleColorChange = (handle) => router.push(`/product/${handle}`);
  const handleInRoute = (handle) => query.handle === handle;
  const discountData = useSelector(getDiscountsSelector);

  const grantSubscription = discountObject?.grantSubscription;

  const handleModalOpen = (cohort: string) => {
    const modalName = cohort;
    handleAnalytics(EventType.ModuleClicked, {
      cta: modalName,
      location: modalName,
    });
    return setModal(modalName);
  };

  const hasSizingKit = !discountData.noSizingKit;

  /**
   * Handler for ring size change
   */
  const handleRingSizeChange = (
    evt: ChangeEvent<HTMLSelectElement>,
    resetSize?: string,
  ) => {
    const target = evt?.target;
    if (!target) {
      setRingSize(resetSize);
    } else {
      setRingSize(target.value);
    }
  };

  return (
    <>
      <div className="mt-3.5 md:mt-0">
        <div className={styles.swatchWrapper}>
          {COLORS.map((color) => (
            <Swatch
              isSelected={handleInRoute(color.handle)}
              image={
                <img
                  data-cy={`swatch-${color.handle}`}
                  alt={formatMessage({ id: color.label })}
                  title={formatMessage({ id: color.description })}
                  {...srcSet(color.img, 'png', [60], '', { w: 60 })}
                />
              }
              label={formatMessage({ id: color.label })}
              onClick={() => handleColorChange(color.handle)}
              key={`color-${formatMessage({ id: color.label })}`}
            />
          ))}
        </div>
      </div>

      {extendedWarrantyFlag && <div className="border-t mt-10 -mb-4" />}

      {showSizeSelector && (
        <div className="mt-7 md:mt-10">
          <Typography variant="h6" className="mb-5" weight="normal">
            {variantId === VariantId.One ? (
              <>{t('oura_ring_sizing')}</>
            ) : (
              <>{t('choose_your_size')}</>
            )}
          </Typography>
          <div className="text-helsinkiBlue pb-6 lg:pb-0">
            <SizingTableTest variant={VariantId.Zero}>
              <SizeSelector
                onDisableButton={onDisableButton}
                onHelpClick={() => handleModalOpen(RING_SIZING)}
                onRingSizeChange={handleRingSizeChange}
                ringSize={ringSize}
                sizedOptionsOnly={cohort === REPLACEMENT}
              />
            </SizingTableTest>
            <SizingTableTest variant={VariantId.One}>
              <SizeSelectorVariant
                onDisableButton={onDisableButton}
                onHelpClick={() => handleModalOpen(RING_SIZING)}
                onRingSizeChange={handleRingSizeChange}
                ringSize={ringSize}
                sizedOptionsOnly={cohort === REPLACEMENT}
              />
            </SizingTableTest>
          </div>
        </div>
      )}
      <div>
        {!extendedWarrantyFlag && (
          <div className="mt-5 md:mt-8">
            <TeaserBox
              title={t(getTeaserBoxTitle(cohort))}
              summary={getTeaserBoxText(
                subscriptionPrice,
                currencyCode,
                discountAmount,
                cohort,
                campaign,
                grantSubscription,
              )}
              onHelpClick={() => handleModalOpen(cohort)}
              data-cy={getTeaserBoxDataCy(cohort, campaign, grantSubscription)}
            />
          </div>
        )}
        {hasSizingKit && !showSizeSelector && (
          <div className="mt-5 md:mt-8">
            <TeaserBox
              className="mt-6"
              title={t('pdp_highlights_sizing_kit')}
              summary={
                cohort === UPGRADER
                  ? t('sizing_kit_details_upgrader')
                  : t('sizing_kit_details')
              }
              onHelpClick={() => handleModalOpen(RING_SIZING)}
              data-cy={`${
                cohort === UPGRADER
                  ? 'teaser-sizing-kit-upgrader'
                  : 'teaser-sizing-kit'
              }`}
            />
          </div>
        )}
      </div>

      <ProductModalRingSizing
        open={modal === RING_SIZING}
        onClose={handleCloseModal}
      />

      <ProductModalMembership
        open={modal === cohort}
        onClose={handleCloseModal}
      />
      {ready && addToCartButton}
    </>
  );
};

export default RingOptions;
