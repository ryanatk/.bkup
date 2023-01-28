import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useLocaleValues } from '../../../public/locales/LocaleContext';
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
  const router = useRouter();
  const { locale } = router;
  const { messages } = useLocaleValues(locale);

  const limit = useMemo(() => {
    if (!messages) {
      return '';
    }

    if (hasRings && hasChargers) {
      if (maxRings === 1 && maxChargers === 1) {
        return 'cart_one_ring_one_charger_per_order';
      } else if (maxRings === 1) {
        return 'cart_one_ring_max_chargers_per_order';
      } else if (maxChargers === 1) {
        return 'cart_max_rings_one_charger_per_order';
      } else {
        return 'cart_max_rings_max_chargers_per_order';
      }
    }

    if (hasRings) {
      if (maxRings === 1) {
        return 'cart_one_item_per_order';
      } else {
        return 'cart_max_items_per_order';
      }
    }

    if (hasChargers) {
      if (maxChargers === 1) {
        return 'cart_max_items_per_order';
      } else {
        return 'cart_max_items_per_order';
      }
    }
  }, [messages, hasRings, hasChargers, maxRings, maxChargers]);

  return limit ? (
    <div className="pt-6">
      <Alert severity="info" data-cy="cart-error" textColor="helsinkiBlue">
        <Typography>{limit}</Typography>
      </Alert>
    </div>
  ) : (
    <></>
  );
};

export default CartQuantityAlert;
