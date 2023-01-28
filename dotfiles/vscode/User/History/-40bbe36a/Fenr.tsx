import React from 'react';
import { FormattedNumber } from 'react-intl';
import { useSelector } from 'react-redux';
import { RING_SKUS } from '../../../consts/ring';
import { SIZINGKIT_SKU, SUBSCRIPTION_SKU } from '../../../consts/skus';
import { useSubPrice } from '../../../helpers/bilboHelper';
import { t } from '../../../public/locales/LocaleContext';
import { useFeatureFlag } from '../../../queries/FeaturesConfig';
import { Products_content_listProducts } from '../../../queries/types/Products';
import { getCurrencySelector } from '../../../stores/app/selectors';
import { CartLineItem } from '../../../types/CartState';
import Product from '../../../types/Product';
import capitalize from '../../../utils/capitalize';
import Typography from '../Typography';

type ProductItem = {
  product: Product | Products_content_listProducts;
};

interface AdditionalDetailsVariantProps {
  item: CartLineItem & ProductItem;
}

const SIZE_LATER = 'Size later';
const SIZE_PROPERTY = 'Size';

const AdditionalDetails = ({
  item,
}: AdditionalDetailsVariantProps): JSX.Element => {
  const subscriptionPrice = useSubPrice(item.product.comparePrice);
  const currencyCode = useSelector(getCurrencySelector);
  const { selectedTraits } = item?.product;
  const color = selectedTraits?.length > 0 && selectedTraits[0]?.value;
  const { enabled: oneMonthEnabled } = useFeatureFlag(
    'one-month-free-membership',
  );

  const getText = () => {
    const style = item.product?.handle?.split('-')[0];
    const showStyle = () => style && <>{capitalize(style)} | </>;
    const size = item.selectedOptions?.find(
      ({ name }) => name === SIZE_PROPERTY,
    );

    switch (true) {
      case RING_SKUS.includes(item.sku):
        // only show "delivery within 2-5 business days after size confirmation"
        // if user has NOT picked their size.
        if (size?.value === SIZE_LATER) {
          return (
            <>
              {style && showStyle()} {color && color}
              <br />
              {t('checkout_additional_details_ring')}
            </>
          );
        } else {
          return (
            <>
              {style && showStyle()} {color && color}
            </>
          );
        }
      case item.sku === SUBSCRIPTION_SKU:
        return (
          <>
            {oneMonthEnabled ? (
              <div>{t('checkout_additional_details_subs_1month')}</div>
            ) : (
              <div>{t('checkout_additional_details_subs_1')}</div>
            )}
            <div>
              {t('checkout_additional_details_subs_2', {
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
            </div>
          </>
        );
      case item.sku === SIZINGKIT_SKU:
        return <>{t('checkout_additional_details_kit')}</>;
      default:
        return (
          <>
            {t('checkout_order_table_qty')} {item.quantity}
          </>
        );
    }
  };

  const text = getText();

  return text ? (
    <Typography
      Element="div"
      variant="caption"
      data-cy="checkout-additional-details"
      color="grayscale-dark"
    >
      {getText()}
    </Typography>
  ) : null;
};

export default AdditionalDetails;
