import { ReactNode } from 'react';
import { FormattedNumber, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { RING_SIZE_NOT_SELECTED } from '../../../consts/ring';
import { useSubPrice } from '../../../helpers/bilboHelper';
import useActiveDiscounts from '../../../helpers/discounts/useActiveDiscounts';
import { CHARGER_SET } from '../../../hooks/useProduct';
import {
  t,
  useFormatMessageFromValue,
} from '../../../public/locales/LocaleContext';
import { useFeatureFlag } from '../../../queries/FeaturesConfig';
import { Products_content_listProducts } from '../../../queries/types/Products';
import { getCurrencySelector } from '../../../stores/app/selectors';
import { CartLineItem } from '../../../types/CartState';
import capitalize from '../../../utils/capitalize';
import getLineItemOptionByName from '../../../utils/getLineItemOptionByName';
import Typography from '../../sormus/Typography';

const SUBSCRIPTION = 'subscription';

interface RingDescriptionProps {
  size: string;
  color: string;
  style?: string;
}

interface TypographyWrapperProps {
  children: ReactNode;
}

export interface LineItem extends CartLineItem {
  product: Products_content_listProducts;
}

interface ItemProps {
  lineItem: LineItem;
  currencyCode: string;
  oneMonthEnabled: boolean;
}

const getSubscriptionPrice = (lineItem: LineItem) => {
  const { product } = lineItem;
  const { comparePrice } = product;
  return useSubPrice(comparePrice);
};

const RingDescription = ({ size, color, style }: RingDescriptionProps) => {
  const { formatMessage } = useIntl();

  const renderedColor = useFormatMessageFromValue(color);
  const renderedSize = formatMessage({ id: 'line_item_desc_ring' }, { size });

  return (
    <TypographyWrapper>
      {style && <Typography Element="span">{style} | </Typography>}
      {color && <Typography Element="span">{renderedColor}</Typography>}
      {size && size !== RING_SIZE_NOT_SELECTED && (
        <Typography Element="span"> | {renderedSize}</Typography>
      )}
    </TypographyWrapper>
  );
};

const TypographyWrapper = ({ children }: TypographyWrapperProps) => (
  <Typography weight="normal" data-cy="product-caption">
    {children}
  </Typography>
);

const SubscriptionItemDescription = ({
  lineItem,
  currencyCode,
  oneMonthEnabled,
}: ItemProps) => (
  <TypographyWrapper>
    {t(
      oneMonthEnabled
        ? 'cart_subscription_item_description_onemonth'
        : 'cart_subscription_item_description',
      {
        price: (
          <span data-cy="cart-description-subscription-amount">
            <FormattedNumber
              value={getSubscriptionPrice(lineItem)}
              style="currency"
              currency={currencyCode}
            />
          </span>
        ),
      },
    )}
  </TypographyWrapper>
);

const CartLineItemDescription = ({ lineItem }: Pick<ItemProps, 'lineItem'>) => {
  const { product } = lineItem;
  const { isRing, handle, checkoutDescription, selectedTraits } = product;
  const currencyCode = useSelector(getCurrencySelector);
  const color =
    selectedTraits && selectedTraits.length > 0 && selectedTraits[0].value;
  const style = capitalize(handle.split('-')[0]);

  const activeDiscounts = useActiveDiscounts().data || [];
  const hasLifetimeSubscription = activeDiscounts.some(
    (discount) => discount.grantSubscription === 'lifetime',
  );

  const isSubscription = handle === SUBSCRIPTION;
  const isFreeSubscription = isSubscription && hasLifetimeSubscription;
  const isChargerSet = handle === CHARGER_SET;
  const size =
    (isChargerSet || product?.isRing) &&
    getLineItemOptionByName(lineItem, 'Size');

  const { enabled: oneMonthEnabled } = useFeatureFlag(
    'one-month-free-membership',
  );

  if (isRing)
    return <RingDescription color={color} size={size} style={style} />;

  if (isChargerSet)
    return (
      <TypographyWrapper>
        {t('pdp_size')}: {size}
      </TypographyWrapper>
    );
  if (isFreeSubscription)
    return <TypographyWrapper>{t('cart_free_for_life')}</TypographyWrapper>;

  if (isSubscription)
    return (
      <SubscriptionItemDescription
        lineItem={lineItem}
        currencyCode={currencyCode}
        oneMonthEnabled={oneMonthEnabled}
      />
    );

  if (checkoutDescription)
    return <TypographyWrapper>{checkoutDescription}</TypographyWrapper>;

  return null;
};

export default CartLineItemDescription;
