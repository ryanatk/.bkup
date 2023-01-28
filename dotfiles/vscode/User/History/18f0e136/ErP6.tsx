import { ReactElement } from 'react';
import { Typography } from '../../sormus';
import CartLineItemDescription from './CartLineItemDescription';
import CartLineItemPrice from './CartLineItemPrice';
import { CartProductProps } from './CartProduct';
import CartProductQuantity from './CartProductQuantity';
import CartProductRemoveButton from './CartProductRemoveButton';
import LineItemImage from './LineItemImage';

const CartProductChild = ({
  hasQuantity,
  isRemovable,
  lineItem,
  onQuantityChange,
  product,
  productData,
}: CartProductProps): ReactElement => {
  return (
    <div className="py-6 flex items-start justify-between">
      <div className="flex flex-row flex-nowrap gap-8">
        <LineItemImage
          width="32"
          productData={productData}
          lineItem={{ ...lineItem, product }}
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
        <CartLineItemPrice lineItem={{ ...lineItem, product }} />

        {isRemovable && (
          <CartProductRemoveButton
            onRemoveCartItem={() => onQuantityChange(null)}
          />
        )}
      </div>
    </div>
  );
};

export default CartProductChild;
