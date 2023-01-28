import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RING_SIZE_NOT_SELECTED } from '../../../consts/ring';
import { useProductByShopifyId } from '../../../queries/Products';
import cartActions from '../../../stores/cart/actions';
import { getCartSelector } from '../../../stores/cart/selectors';
import { CartLineItem as LineItem } from '../../../types/CartState';
import CartProductRow from './CartProductRow';

interface CartLineItemProps {
  lineItem: LineItem;
  readOnly: boolean;
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

  const sizeOption = lineItem.selectedOptions?.find(
    ({ name }) => name === 'Size',
  );

  const showOptions = sizeOption
    ? !(sizeOption.value === RING_SIZE_NOT_SELECTED)
    : true;

  return (
    <CartProductRow
      {...props}
      readOnly={readOnly}
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
      showOptions={showOptions}
    />
  );
};

export default CartLineItem;
