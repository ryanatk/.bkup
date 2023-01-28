import range from 'lodash/range';
import { useIntl } from 'react-intl';
import { CHARGER_SET, MAX_QUANTITY, REMOVE } from '../../../consts/cart';
import { Products_content_listProducts } from '../../../queries/types/Products';
import { CartLineItem } from '../../../types/CartState';
import { Select } from '../../sormus';
import { useCartActions } from './hooks/useCartActions';
import { useCartState } from './hooks/useCartState';

export interface LineItemProductQuantityProps {
  lineItem: CartLineItem;
  product: Products_content_listProducts;
}

const LineItemProductQuantity = ({
  lineItem,
  product,
}: LineItemProductQuantityProps): JSX.Element => {
  const { formatMessage } = useIntl();
  const { isMultiLineEnabled } = useCartState();
  const { handleUpdateLineItemQuantity } = useCartActions();
  const isCharger = product.handle === CHARGER_SET;
  const hasQuantity = (isCharger || product.isRing) && isMultiLineEnabled;
  const quantityOptions = [
    ...range(
      lineItem.quantity > MAX_QUANTITY ? lineItem.quantity : MAX_QUANTITY,
    ).map((num) => `${num + 1}`),
    formatMessage({ id: 'cart_remove' }),
  ];

  const handleQuantityChange = ({ target }) => {
    if (target.value === REMOVE) {
      handleUpdateLineItemQuantity(null, lineItem);
    } else {
      handleUpdateLineItemQuantity(parseInt(target.value), lineItem);
    }
  };

  if (!hasQuantity) return null;

  return (
    <Select
      name="ring-quantity"
      label="Quantity"
      hiddenLabel
      data-cy={`select-quantity-${product.handle}`}
      data-lineitem={lineItem.id}
      value={lineItem.quantity}
      onChange={handleQuantityChange}
      options={quantityOptions}
      hideUnderline={true}
      className="w-10"
    />
  );
};

export default LineItemProductQuantity;
