import { ReactElement } from 'react';
import { CartLineItem } from '../../../types/CartState';
import { Typography } from '../../sormus';
import CartLineItemDescription from './CartLineItemDescription';
import CartLineItemPrice from './CartLineItemPrice';
import CartProductQuantity from './CartProductQuantity';
import CartProductRemoveButton from './CartProductRemoveButton';
import LineItemImage from './LineItemImage';

interface CartProductProps {
  hasQuantity: boolean;
  isRemovable: boolean;
  lineItem: CartLineItem;
  onQuantityChange: (qty: number) => void;
  product: {
    handle: string;
  };
  productData: any;
}

const CartProductChild = ({
  hasQuantity,
  isRemovable,
  lineItem,
  onQuantityChange,
  product,
  productData,
}: CartProductProps): ReactElement => {
  return (
    <li
      className="py-6 flex items-start justify-between"
      data-cy="cart-product-row"
    >
      <div className="flex flex-row flex-nowrap gap-8">
        <LineItemImage
          width="32"
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

        <CartLineItemDescription lineItem={{ ...lineItem, product }} />

        {hasQuantity && (
          <CartProductQuantity
            handle={product.handle}
            onQuantityChange={onQuantityChange}
            quantity={lineItem.quantity}
          />
        )}
      </div>

      <div className="flex items-start justify-between w-1/4">
        <CartLineItemPrice lineItem={lineItem} />

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
