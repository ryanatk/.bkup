import range from 'lodash/range';
import { MAX_QUANTITY, REMOVE } from '../../../consts/cart';
import { Select } from '../../sormus';

const QUANTITY_OPTIONS = [...range(MAX_QUANTITY), REMOVE];

interface Props {
  handle: string;
  onQuantityChange: (qty: number) => void;
  quantity: number;
}

const CartProductQuantity = ({
  handle,
  onQuantityChange,
  quantity,
}: Props): JSX.Element => {
  const handleQuantityChange = ({ target }) => {
    if (target.value === REMOVE) {
      onQuantityChange(null);
    } else {
      onQuantityChange(parseInt(target.value));
    }
  };

  return (
    <Select
      name="ring-quantity"
      label="Quantity"
      hiddenLabel
      data-cy={`select-quantity-${handle}`}
      value={quantity}
      onChange={handleQuantityChange}
      options={QUANTITY_OPTIONS}
      className="w-8"
    />
  );
};

export default CartProductQuantity;
