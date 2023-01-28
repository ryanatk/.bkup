import { ReactElement, useCallback, useMemo } from 'react';
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

  const isAble = useMemo(() => {
    const { handle, isRing, variants } = product ?? {};

    return {
      remove:
        handle === CHARGER_SET ||
        isRing ||
        [EXTENDED_WARRANTY_2YEAR_ID, EXTENDED_WARRANTY_3YEAR_ID].includes(
          Number(variants?.[0].variantId),
        ),
      changeQuantity: isRing,
    };
  }, [product]);

  // from product-row

  const onQuantityChange = useCallback(
    (quantity) => {
      dispatch(
        cartActions.reqUpdateCartItemsAction({
          cart,
          variantId: lineItem.id,
          quantity: quantity || 0,
          addFreeSizingKit: false,
          extendedWarrantyId: null,
        }),
      );
    },
    [cart, dispatch, lineItem.id],
  );

  const Component = isParent ? CartProductParent : CartProductChild;

  return isLoading ? null : (
    <Component
      {...props}
      isRemovable={isRemovable}
      lineItem={{ ...lineItem, product }}
      onQuantityChange={onQuantityChange}
      productData={productData}
    />
  );
};

export default CartProduct;
