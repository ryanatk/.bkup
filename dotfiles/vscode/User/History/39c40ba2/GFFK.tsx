import { FormattedNumber, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { RING_SIZE_NOT_SELECTED } from '../../../consts/ring';
import { useSubPrice } from '../../../helpers/bilboHelper';
import useActiveDiscounts from '../../../helpers/discounts/useActiveDiscounts';
import { CHARGER_SET } from '../../../pages/product/[handle]';
import { t } from '../../../public/locales/LocaleContext';
import { getCurrencySelector } from '../../../stores/app/selectors';
import { CartLineItem } from '../../../types/CartState';
import getLineItemOptionByName from '../../../utils/getLineItemOptionByName';
import Typography from '../../sormus/Typography';

const SUBSCRIPTION = 'subscription';

const getSubscriptionPrice = (lineItem) => {
  const { product } = lineItem;
  const { comparePrice } = product;
  return useSubPrice(comparePrice);
};

const RingDescription = ({ size, color }) => {
  const { formatMessage } = useIntl();

  let descriptionParts = [];

  if (color) descriptionParts = [...descriptionParts, color];

  if (size && size !== RING_SIZE_NOT_SELECTED)
    descriptionParts = [
      ...descriptionParts,
      formatMessage({ id: 'line_item_desc_ring' }, { size }),
    ];

  return descriptionParts.length > 0 ? (
    <TypographyWrapper>{descriptionParts.join(' | ').trim()}</TypographyWrapper>
  ) : null;
};

const TypographyWrapper = ({ children }) => (
  <Typography weight="normal" data-cy="product-caption">
    {children}
  </Typography>
);

const SubscriptionItemDescription = ({ lineItem, currencyCode }) => (
  <TypographyWrapper>
    {t('cart_subscription_item_description', {
      price: (
        <span data-cy="cart-description-subscription-amount">
          <FormattedNumber
            value={getSubscriptionPrice(lineItem)}
            style="currency"
            currency={currencyCode}
          />
        </span>
      ),
    })}
  </TypographyWrapper>
);

interface Props {
  lineItem: CartLineItem;
}

const CartLineItemDescription = ({ lineItem }): Props => {
  const { product } = lineItem;
  const { isRing, handle, checkoutDescription, selectedTraits } = product;
  const currencyCode = useSelector(getCurrencySelector);
  const color =
    selectedTraits && selectedTraits.length > 0 && selectedTraits[0].value;

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

  if (isRing) return <RingDescription color={color} size={size} />;

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
      />
    );

  if (checkoutDescription)
    return <TypographyWrapper>{checkoutDescription}</TypographyWrapper>;

  return null;
};

export default CartLineItemDescription;
