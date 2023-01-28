import { Typography } from '@material-ui/core';
import { useMemo } from 'react';
import { t } from '../../../public/locales/LocaleContext';
import Alert from '../../sormus/Alert';

interface Props {
  hasRings: boolean;
  hasChargers: boolean;
  maxRings: number;
  maxChargers: number;
}

const CartQuantityAlert = ({
  hasRings,
  hasChargers,
  maxRings,
  maxChargers,
}: Props): JSX.Element => {
  const quantityMessage = useMemo(() => {
    if (hasRings && hasChargers) {
      return t('cart_max_items_per_order', {
        max: maxRings,
      });
    }

    if (hasRings) {
      return t('cart_max_items_per_order', {
        max: maxRings,
      });
    }

    if (hasChargers) {
      return t('cart_one_item_per_order');
    }
  }, [hasRings, hasChargers, maxRings, maxChargers]);

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
