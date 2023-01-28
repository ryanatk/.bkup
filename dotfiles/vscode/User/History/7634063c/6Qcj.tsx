import { useCallback } from 'react';
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
import { isCharger } from '../../../utils/cartCount';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';
import CartProductChild from './CartProductChild';
import CartProductParent from './CartProductParent';

// for use in Parent+Child
export interface CartProductProps {
  hasQuantity: boolean;
  isRemovable: boolean;
  lineItem: CartLineItem;
  onQuantityChange: (qty: number) => void;
  productData: any;
}

interface Props {
  isParent: boolean;
  lineItem: CartLineItem;
}

const CartProduct = ({ isParent, lineItem, ...props }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const cart = useSelector(getCartSelector);

  const { data: product, isLoading } = useProductByShopifyId(
    lineItem.productId,
  );

  const isMultiLineEnabled = checkFeatureFlag('enable-multi-line-items');
  const isChargerQuantityEnabled = checkFeatureFlag('enable-charger-quantity');

  const hasQuantity =
    (isCharger(lineItem) && isChargerQuantityEnabled) ||
    (product?.isRing && isMultiLineEnabled);
  const isRemovable =
    product?.handle === CHARGER_SET ||
    product?.isRing ||
    [EXTENDED_WARRANTY_2YEAR_ID, EXTENDED_WARRANTY_3YEAR_ID].includes(
      Number(product?.variants?.[0].variantId),
    );

  const { data: productData } = useProductByHandle(product?.handle);

  const onQuantityChange = useCallback(
    (quantity) => {
      dispatch(
        cartActions.reqUpdateCartItemsAction({
          cart,
          variantId: Number(lineItem.id),
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
      hasQuantity={hasQuantity}
      lineItem={{ ...lineItem, product }}
      onQuantityChange={onQuantityChange}
      productData={productData}
    />
  );
};

export default CartProduct;
