import { ReactElement } from 'react';
import { Select } from '../../sormus';

const REMOVE = 'Remove';
const QUANTITY_OPTIONS = ['1', '2', '3', '4', '5', REMOVE];

interface Props {
  handle: string;
  onQuantityChange: (qty: number) => void;
  quantity: number;
}

const CartProductQuantity = ({
  handle,
  onQuantityChange,
  quantity,
}: Props): ReactElement => {
  const handleQuantityChange = ({ target }) => {
    if (target.value === 'Remove') {
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
      className="w-12"
    />
  );
};

export default CartProductQuantity;
