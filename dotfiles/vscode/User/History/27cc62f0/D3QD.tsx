import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RING_SIZE_NOT_SELECTED } from '../../../consts/ring';
import { useProductByShopifyId } from '../../../queries/Products';
import cartActions from '../../../stores/cart/actions';
import { getCartSelector } from '../../../stores/cart/selectors';
import { CartLineItem as LineItemProps } from '../../../types/CartState';
import CartProductRow from './CartProductRow';

interface CartLineItemProps {
  lineItem: LineItemProps;
}

const CartLineItem = ({
  lineItem,
  readOnly,
  ...props
}: CartLineItemProps): ReactElement => {
  const dispatch = useDispatch();

  const { data: product, isLoading } = useProductByShopifyId(
    lineItem.productId,
  );
  const cart = useSelector(getCartSelector);

  if (isLoading) return null;

  const sizeOption =
    lineItem.selectedOptions &&
    lineItem.selectedOptions.find((o) => o.name === 'Size');
  let showOptions = true;

  if (sizeOption) {
    showOptions = !(sizeOption.value === RING_SIZE_NOT_SELECTED);
  }

  return (
    <>
      <CartProductRow
        {...props}
        readOnly={readOnly}
        lineItem={{ ...lineItem, product }}
        onQuantityChange={(quantity) => {
          if (quantity === null) quantity = 0;

          dispatch(
            cartActions.reqUpdateCartItemsAction({
              cart,
              variantId: lineItem.id,
              quantity: quantity,
              addFreeSizingKit: false,
              extendedWarrantyId: null,
            }),
          );
        }}
        showOptions={showOptions}
      />
    </>
  );
};

export default CartLineItem;
