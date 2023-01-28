import { ReactElement } from 'react';
import { CartLineItem } from '../../../types/CartState';
import { Typography } from '../../sormus';
import CartLineItemDescription from './CartLineItemDescription';
import CartLineItemPrice from './CartLineItemPrice';
import CartProductQuantity from './CartProductQuantity';
import CartProductRemoveButton from './CartProductRemoveButton';
import LineItemImage from './LineItemImage';

interface CartProductRowProps {
  isRemovable: boolean;
  lineItem: CartLineItem;
  onQuantityChange: (qty: number) => void;
  productData: any;
}

const CartProductChild = ({
  isRemovable,
  lineItem,
  onQuantityChange,
  productData,
}: CartProductRowProps): ReactElement => {
  return (
    <li
      className="py-6 flex items-start justify-between"
      data-cy="cart-product-row"
    >
      <div className="flex flex-row flex-nowrap gap-8">
        <LineItemImage
          productData={productData}
          lineItem={lineItem}
          className="flex-grow-0 flex-shrink-0 w-16"
        />

        <Typography
          color="helsinkiBlue"
          variant="h6"
          weight="medium"
          data-cy="product-title"
        >
          {lineItem.title}
        </Typography>

        <CartLineItemDescription lineItem={lineItem} />

        {lineItem.product.isRing && (
          <CartProductQuantity
            lineItem={lineItem}
            onQuantityChange={onQuantityChange}
          />
        )}
      </div>

      <div className="flex items-start justify-between w-1/4">
        <Typography
          variant="h6"
          Element="div"
          weight="normal"
          className={'w-full lg:w-2/3'}
          align="right"
        >
          <CartLineItemPrice lineItem={lineItem} />
        </Typography>

        {isRemovable && (
          <CartProductRemoveButton
            onRemoveCartItem={() => onQuantityChange(null)}
          />
        )}
      </div>
    </li>
  );
};

export default CartProductChild;
