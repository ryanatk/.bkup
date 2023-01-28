import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  EXTENDED_WARRANTY_2YEAR_ID,
  EXTENDED_WARRANTY_3YEAR_ID,
} from '../../../consts/extendedWarranty';
import { RING_SIZE_NOT_SELECTED } from '../../../consts/ring';
import { CHARGER_SET } from '../../../pages/product/[handle]';
import {
  useProductByHandle,
  useProductByShopifyId,
} from '../../../queries/Products';
import cartActions from '../../../stores/cart/actions';
import { getCartSelector } from '../../../stores/cart/selectors';
import { CartLineItem } from '../../../types/CartState';
import CartProductChild from './CartProductChild';
import CartProductParent from './CartProductParent';

const SIZING_KIT = 'sizing-kit';
const QUANTITY_OPTIONS = ['1', '2', '3', '4', '5'];

interface CartLineItemProps {
  isParent: boolean;
  lineItem: CartLineItem;
}

const CartProduct = ({
  isParent,
  lineItem,
  ...props
}: CartLineItemProps): ReactElement => {
  const dispatch = useDispatch();

  const { data: product, isLoading } = useProductByShopifyId(
    lineItem.productId,
  );
  const cart = useSelector(getCartSelector);
  const { data: productData } = useProductByHandle(lineItem.product?.handle);

  if (isLoading) return null;

  const showOptions = ![RING_SIZE_NOT_SELECTED].includes(
    lineItem.selectedOptions?.find(({ name }) => name === 'Size')?.value,
  );

  // from product-row
  const quantityOptions =
    lineItem.product?.handle === SIZING_KIT
      ? QUANTITY_OPTIONS
      : [...QUANTITY_OPTIONS, 'Remove'];

  const onQuantityChange = (quantity) => {
    dispatch(
      cartActions.reqUpdateCartItemsAction({
        cart,
        variantId: lineItem.id,
        quantity: quantity || 0,
        addFreeSizingKit: false,
        extendedWarrantyId: null,
      }),
    );
  };

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

  const Component = isParent ? CartProductParent : CartProductChild;

  return (
    <Component
      {...props}
      onQuantityChange={onQuantityChange}
      lineItem={{ ...lineItem, product }}
      showOptions={showOptions}
      productData={productData}
      isRemovable={isRemoveable}
    />
  );
};

export default CartProduct;
