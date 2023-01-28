import { Typography } from '@material-ui/core';
import Alert from '../../sormus/Alert';

const getQuantityMessage = (hasRings, hasChargers) => {
  if (hasRings && hasChargers) {
    return t('cart_max_items_per_order', {
      max: MAX_CHARGERS_PER_ORDER,
    });
  }

  if (hasRings) {
    return t('cart_max_items_per_order', {
      max: MAX_CHARGERS_PER_ORDER,
    });
  }

  if (hasChargers) {
    return t('cart_one_item_per_order');
  }
};

const CartQuantityAlert = ({
  hasRings,
  hasChargers,
  maxRings,
  maxChargers,
}): JSX.Element => {
  const quantityMessage = getQuantityMessage(
    hasRings,
    hasChargers,
    maxRings,
    maxChargers,
  );

  return quantityMessage ? (
    <div className="pt-6">
      <Alert severity="info" data-cy="cart-error" textColor="helsinkiBlue">
        <Typography>{quantityMessage}</Typography>
      </Alert>
    </div>
  ) : (
    <></>
  );
};

export default CartQuantityAlert;
