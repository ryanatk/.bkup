import { SyntheticEvent } from 'react';
import CartState from '../../../types/CartState';
import CartCheckout from './CartCheckout';
import CartPromos from './CartPromos';
import CartShopNowButton from './CartShopNowButton';

interface CartTableFooterProps {
  cart: CartState;
  cartHasItems: boolean;
  onClickCheckout: React.EventHandler<SyntheticEvent>;
  tooManyCartItems: boolean;
}

const CartTableFooter = ({
  cart,
  cartHasItems,
  onClickCheckout,
  tooManyCartItems,
}: CartTableFooterProps) => {
  const affirmTotalPrice =
    cart && cart.totalPriceAfterDiscount
      ? Math.round(cart.totalPriceAfterDiscount * 100)
      : 0;

  return (
    <div className="border-t border-sand-dark pt-8 flex flex-col items-start justify-between md:flex-row-reverse md:gap-12">
      <div className="w-full lg:max-w-sm">
        {cartHasItems && (
          <CartCheckout
            hasItemsInCart={true}
            affirmTotalPrice={affirmTotalPrice}
            tooManyCartItems={tooManyCartItems}
            handleCheckout={onClickCheckout}
          />
        )}
      </div>

      {cart.totalCount > 0 ? <CartPromos /> : <CartShopNowButton />}
    </div>
  );
};

export default CartTableFooter;
