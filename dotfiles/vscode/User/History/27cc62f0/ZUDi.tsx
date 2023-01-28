import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useProductByShopifyId } from '../../../queries/Products';
import cartActions from '../../../stores/cart/actions';
import { getCartSelector } from '../../../stores/cart/selectors';
import { CartLineItem as LineItem } from '../../../types/CartState';
import CartProductRow from './CartProductRow';

interface CartLineItemProps {
  lineItem: LineItem;
}

const CartLineItem = ({
  lineItem,
  ...props
}: CartLineItemProps): ReactElement => {
  const dispatch = useDispatch();

  const { data: product, isLoading } = useProductByShopifyId(
    lineItem.productId,
  );
  const cart = useSelector(getCartSelector);

  if (isLoading) return null;

  return (
    <CartProductRow
      {...props}
      lineItem={{ ...lineItem, product }}
      onQuantityChange={(quantity) => {
        dispatch(
          cartActions.reqUpdateCartItemsAction({
            cart,
            variantId: lineItem.id,
            quantity: quantity || 0,
            addFreeSizingKit: false,
            extendedWarrantyId: null,
          }),
        );
      }}
    />
  );
};

export default CartLineItem;
