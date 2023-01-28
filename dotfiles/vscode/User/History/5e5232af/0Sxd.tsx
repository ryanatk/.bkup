import { useSubPrice } from '../../../helpers/bilboHelper';
import { t } from '../../../public/locales/LocaleContext';
import { Typography } from '../../sormus';
import Price from '../../sormus/Price';

export const SUBSCRIPTION = 'subscription';
export const SIZING_KIT = 'sizing-kit';

const hasDiscount = (lineItem) => lineItem.totalDiscountPrice > 0;
const hasMultiple = (lineItem) => lineItem.quantity > 1;
const isSubscription = (lineItem) => lineItem.product.handle === SUBSCRIPTION;
const isSizingKit = (lineItem) => lineItem.product.handle === SIZING_KIT;

export const getSubscriptionPrice = (lineItem) => {
  const { product } = lineItem;
  const { comparePrice } = product;
  return useSubPrice(comparePrice);
};

const CartLineItemPrice = ({ lineItem }) => {
  const { price, totalDiscountPrice } = lineItem;

  if (isSizingKit(lineItem) && !hasMultiple(lineItem)) return t('cart_free');

  if (isSubscription(lineItem))
    return (
      <Typography
        variant="h6"
        Element="div"
        weight="normal"
        className={'w-full lg:w-2/3'}
        align="right"
      >
        <Price
          data-cy="price-subscription-lineItem"
          price={getSubscriptionPrice(lineItem)}
          discount={getSubscriptionPrice(lineItem)}
          priceCompare
          stacked
        />
      </Typography>
    );
};

export default CartLineItemPrice;
