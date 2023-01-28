import { ReactElement } from 'react';
import { Typography } from '../../sormus';
import CartLineItemDescription from './CartLineItemDescription';
import CartLineItemPrice from './CartLineItemPrice';
import { CartProductProps } from './CartProduct';
import CartProductQuantity from './CartProductQuantity';
import CartProductRemoveButton from './CartProductRemoveButton';
import LineItemImage from './LineItemImage';

const CartProductParent = ({
  hasQuantity,
  isRemovable,
  lineItem,
  onQuantityChange,
  productData,
}: CartProductProps): ReactElement => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 flex-nowrap w-full">
        <LineItemImage
          width="130"
          productData={productData}
          lineItem={lineItem}
          className="flex-grow-0 flex-shrink-0 self-center md:self-start h-24 w-36 relative overflow-hidden mb-4 md:mb-0"
          imageClassName="absolute -top-4"
        />

        <div className="flex flex-row flex-nowrap gap-8 w-full">
          <div className="flex-grow">
            <Typography
              color="helsinkiBlue"
              variant="h5"
              weight="medium"
              data-cy="product-title"
            >
              {lineItem.title}
            </Typography>

            <div className="flex items-center divide-x divide-helsinkiBlue">
              <CartLineItemDescription lineItem={lineItem} />

              {hasQuantity && (
                <div className="ml-3 pl-3">
                  <CartProductQuantity
                    handle={lineItem.product.handle}
                    onQuantityChange={onQuantityChange}
                    quantity={lineItem.quantity}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <CartLineItemPrice lineItem={lineItem} />

            {isRemovable && (
              <CartProductRemoveButton
                onRemoveCartItem={() => onQuantityChange(null)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductParent;
