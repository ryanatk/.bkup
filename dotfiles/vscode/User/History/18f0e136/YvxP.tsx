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
  productData,
}: CartProductProps): ReactElement => {
  return (
    <div className="py-3 flex items-start justify-between md:ml-36">
      <div className="flex flex-row flex-nowrap gap-4">
        <LineItemImage
          width="32"
          productData={productData}
          lineItem={lineItem}
          className="flex-grow-0 flex-shrink-0 w-8"
        />

        <div>
          <Typography
            color="helsinkiBlue"
            variant="h6"
            weight="medium"
            data-cy="product-title"
          >
            {lineItem.title}
          </Typography>

          <div className="flex items-center divide-x divide-helsinkiBlue">
            <CartLineItemDescription lineItem={lineItem} />

            {hasQuantity && (
              <CartProductQuantity
                handle={lineItem.product.handle}
                onQuantityChange={onQuantityChange}
                quantity={lineItem.quantity}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end w-1/4">
        <CartLineItemPrice lineItem={lineItem} />

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
