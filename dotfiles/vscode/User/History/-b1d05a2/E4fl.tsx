import { Typography } from '@material-ui/core';
import { useMemo } from 'react';
import { t } from '../../../public/locales/LocaleContext';
import Alert from '../../sormus/Alert';

const RING = t('ring');

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
  const limit = useMemo(() => {
    const ringLimit = maxRings === 1 ? `one ${RING}` : `${maxRings} rings`;
    const chargerLimit =
      maxChargers === 1 ? 'one charger' : `${maxChargers} chargers`;

    if (hasRings && hasChargers) {
      return `${ringLimit} and ${chargerLimit}`;
    }

    if (hasRings) {
      return ringLimit;
    }

    if (hasChargers) {
      return chargerLimit;
    }
  }, [hasRings, hasChargers, maxRings, maxChargers]);

  return limit ? (
    <div className="pt-6">
      <Alert severity="info" data-cy="cart-error" textColor="helsinkiBlue">
        <Typography>{t('cart_max_items_per_order', { limit })}</Typography>
      </Alert>
    </div>
  ) : (
    <></>
  );
};

export default CartQuantityAlert;
