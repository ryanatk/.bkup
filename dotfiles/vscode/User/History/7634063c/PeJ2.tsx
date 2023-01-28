import { ReactElement, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  EXTENDED_WARRANTY_2YEAR_ID,
  EXTENDED_WARRANTY_3YEAR_ID,
} from '../../../consts/extendedWarranty';
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
const REMOVE = 'Remove';

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
  const { data: productData } = useProductByHandle(product?.handle);
  const cart = useSelector(getCartSelector);

  const isRemovable = useMemo(() => {
    const { handle, isRing, variants } = product ?? {};

    return (
      handle === CHARGER_SET ||
      isRing ||
      [EXTENDED_WARRANTY_2YEAR_ID, EXTENDED_WARRANTY_3YEAR_ID].includes(
        Number(variants?.[0].variantId),
      )
    );
  }, [product]);

  if (isLoading) return null;

  // from product-row
  const quantityOptions =
    lineItem.product?.handle === SIZING_KIT
      ? QUANTITY_OPTIONS
      : [...QUANTITY_OPTIONS, REMOVE];

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

  const Component = isParent ? CartProductParent : CartProductChild;

  return (
    <Component
      {...props}
      isRemovable={isRemovable}
      lineItem={{ ...lineItem, product }}
      onQuantityChange={onQuantityChange}
      productData={productData}
      quantityOptions={quantityOptions}
    />
  );
};

export default CartProduct;
