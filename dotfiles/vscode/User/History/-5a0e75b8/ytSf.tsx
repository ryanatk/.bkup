import React from 'react';
import { t } from '../../../public/locales/LocaleContext';
import { Typography } from '../../sormus';
import CartContinueShoppingButton from './CartContinueShoppingButton';

interface Props {
  tooManyCartItems: boolean;
  cartHasItems: boolean;
}

const CartTableHeader = ({
  tooManyCartItems,
  cartHasItems,
}: Props): JSX.Element => {
  return (
    <div className="border-b border-sand-dark pb-6">
      <div className="flex items-end justify-between">
        <Typography
          Element="h2"
          variant="h3"
          color="helsinkiBlue"
          data-cy="cart-title"
          className="-mb-3"
        >
          {t('cart_cart')}
        </Typography>
        <div className="w-full max-w-sm text-right -mb-3">
          {cartHasItems && !tooManyCartItems && <CartContinueShoppingButton />}
        </div>
      </div>
    </div>
  );
};

export default CartTableHeader;
