import { ReactElement, useState } from 'react';
import {
  EXTENDED_WARRANTY_2YEAR_ID,
  EXTENDED_WARRANTY_3YEAR_ID,
} from '../../../consts/extendedWarranty';
import { CHARGER_SET } from '../../../pages/product/[handle]';
import { t } from '../../../public/locales/LocaleContext';
import { useProductByHandle } from '../../../queries/Products';
import { CartLineItem } from '../../../types/CartState';
import { BodyLink, Select, Typography } from '../../sormus';
import CartLineItemDescription from './CartLineItemDescription';
import CartLineItemPrice from './CartLineItemPrice';
import LineItemImage from './LineItemImage';

const SIZING_KIT = 'sizing-kit';

interface CartProductRowProps {
  lineItem: CartLineItem;
  showOptions?: boolean;
  onQuantityChange: (qty: number) => void;
}

const CartProductRow = ({
  lineItem,
  onQuantityChange,
}: CartProductRowProps): ReactElement => {
  const [quantity, setQuantity] = useState('');

  const quantityOptions =
    lineItem.product?.handle === SIZING_KIT
      ? ['1', '2', '3', '4', '5']
      : ['1', '2', '3', '4', '5', 'Remove'];

  const { data: productData } = useProductByHandle(lineItem.product?.handle);

  const handleRemoveCartItem = () => {
    onQuantityChange(null);
  };

  const handleQuantityChange = ({ target }) => {
    if (target.value === 'Remove') {
      handleRemoveCartItem();
    } else {
      onQuantityChange(parseInt(target.value));
    }
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

  return (
    <div
      className="py-6 flex items-start justify-between"
      data-cy="cart-product-row"
    >
      <div className="flex flex-row flex-nowrap gap-8">
        <LineItemImage
          productData={productData}
          lineItem={lineItem}
          className="flex-grow-0 flex-shrink-0 w-16"
        />

        <Typography
          color="helsinkiBlue"
          variant="h6"
          weight="medium"
          data-cy="product-title"
        >
          {lineItem.title}
        </Typography>

        <CartLineItemDescription lineItem={lineItem} />

        {lineItem.product.isRing && (
          <Select
            name="ring-quantity"
            label="Quantity"
            data-cy={`select-quantity-${lineItem.product?.handle}`}
            labelShrink={!!quantity}
            value={lineItem.quantity}
            onChange={handleQuantityChange}
            options={quantityOptions}
            className="w-12"
          />
        )}
      </div>

      <div className="flex items-start justify-between w-1/4">
        <Typography
          variant="h6"
          Element="div"
          weight="normal"
          className={'w-full lg:w-2/3'}
          align="right"
        >
          <CartLineItemPrice lineItem={lineItem} />
        </Typography>

        {isRemoveable(lineItem) && (
          <button
            onClick={handleRemoveCartItem}
            data-cy={`button-remove-cart-item`}
          >
            <BodyLink color="dawnBlue-dark">{t('cart_remove')}</BodyLink>
          </button>
        )}
      </div>
    </div>
  );
};

export default CartProductRow;
