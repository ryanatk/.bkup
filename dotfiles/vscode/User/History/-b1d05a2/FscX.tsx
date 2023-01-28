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
  console.log({ messages });

  const limit = useMemo(() => {
    if (!messages) {
      return '';
    }

    const ringLimit =
      maxRings === 1
        ? `${messages.one} ${messages.ring}`
        : `${maxRings} ${messages.rings}`;
    const chargerLimit =
      maxChargers === 1
        ? `${messages.one} ${messages.charger}`
        : `${maxChargers} ${messages.chargers}`;

    if (hasRings && hasChargers) {
      return `${ringLimit} ${messages.and} ${chargerLimit}`;
    }

    if (hasRings) {
      return ringLimit;
    }

    if (hasChargers) {
      return chargerLimit;
    }
  }, [messages, hasRings, hasChargers, maxRings, maxChargers]);

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
