import range from 'lodash/range';
import { useIntl } from 'react-intl';
import tw from 'twin.macro';
import { CHARGER_SET, MAX_QUANTITY, REMOVE } from '../../../consts/cart';
import { Products_content_listProducts } from '../../../queries/types/Products';
import { CartLineItem } from '../../../types/CartState';
import { Select, Typography } from '../../sormus';
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
  const maxQuantity =
    lineItem.quantity > MAX_QUANTITY ? lineItem.quantity : MAX_QUANTITY;
  const quantityOptions = [
    ...range(maxQuantity).map((num) => `${num + 1}`),
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
    <span css={tw`flex items-center`}>
      <Typography color="grayscale2" weight="normal" className="text-base">
        &nbsp;|&nbsp;
      </Typography>
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
    </span>
  );
};

export default LineItemProductQuantity;
