import React from 'react';
import { t } from '../../../public/locales/LocaleContext';
import CartLedger from '../../pages/cart/CartLedger';
import { AffirmPromo, Button } from '../../sormus';

interface CartCheckoutProps {
  hasItemsInCart: boolean;
  tooManyCartItems?: boolean;
  handleCheckout: any;
  affirmTotalPrice?: number;
}

const CartCheckout: React.FC<CartCheckoutProps> = ({
  hasItemsInCart,
  tooManyCartItems,
  handleCheckout,
  affirmTotalPrice,
}) => {
  return (
    hasItemsInCart && (
      <>
        <div>
          <CartLedger />
        </div>

        <div className="my-8">
          <Button
            onClick={handleCheckout}
            data-cy="button-checkout"
            disabled={tooManyCartItems}
            className="w-full"
          >
            {t('checkout_proceed')}
          </Button>
        </div>

        <div className="text-center">
          <AffirmPromo
            price={affirmTotalPrice}
            pageType="cart"
            data-cy="affirm-promo"
            showLearnMore={true}
            textColor="helsinkiBlue-dark"
            footnote={
              <sup>
                <a href="#legal-footnotes">†</a>
              </sup>
            }
          />
        </div>
      </>
    )
  );
};

export default CartCheckout;
