import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { t, useLocaleValues } from '../../../public/locales/LocaleContext';
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
        return t('cart_max_items_per_order', { maxRings, maxChargers });
      } else if (maxRings === 1) {
        return t('cart_max_items_per_order', { maxRings, maxChargers });
      } else if (maxChargers === 1) {
        return t('cart_max_items_per_order', { maxRings, maxChargers });
      } else {
        return t('cart_max_items_per_order', { maxRings, maxChargers });
      }
    }

    if (hasRings) {
      if (maxRings === 1) {
        return t('cart_max_items_per_order', { maxRings });
      } else {
        return t('cart_max_items_per_order', { maxRings });
      }
    }

    if (hasChargers) {
      if (maxChargers === 1) {
        return t('cart_max_items_per_order', { maxChargers });
      } else {
        return t('cart_max_items_per_order', { maxChargers });
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
