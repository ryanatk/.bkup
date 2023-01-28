import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  EXTENDED_WARRANTY_2YEAR_ID,
  EXTENDED_WARRANTY_3YEAR_ID,
} from '../../../consts/extendedWarranty';
import { RING_SIZE_NOT_SELECTED } from '../../../consts/ring';
import { CHARGER_SET } from '../../../pages/product/[handle]';
import { useProductByShopifyId } from '../../../queries/Products';
import cartActions from '../../../stores/cart/actions';
import { getCartSelector } from '../../../stores/cart/selectors';
import { CartLineItem } from '../../../types/CartState';
import CartProductRow from './CartProductRow';

interface CartLineItemProps {
  lineItem: CartLineItem;
}

const CartProduct = ({
  lineItem,
  ...props
}: CartLineItemProps): ReactElement => {
  const dispatch = useDispatch();

  const { data: product, isLoading } = useProductByShopifyId(
    lineItem.productId,
  );
  const cart = useSelector(getCartSelector);

  if (isLoading) return null;

  const showOptions = ![RING_SIZE_NOT_SELECTED].includes(
    lineItem.selectedOptions?.find(({ name }) => name === 'Size')?.value,
  );

  const isRemoveable = ({ product }: CartLineItem) => {
    const { handle, isRing, variants } = product;

    return (
      handle === CHARGER_SET ||
      isRing ||
      [EXTENDED_WARRANTY_2YEAR_ID, EXTENDED_WARRANTY_3YEAR_ID].includes(
        Number(variants[0].variantId),
      )
    );
  };

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
      showOptions={showOptions}
    />
  );
};

export default CartProduct;
