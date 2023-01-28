import { ReactElement } from 'react';
import { Select } from '../../sormus';

const SIZING_KIT = 'sizing-kit';
const QUANTITY_OPTIONS = ['1', '2', '3', '4', '5'];
const REMOVE = 'Remove';

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
  const quantityOptions =
    handle === SIZING_KIT ? QUANTITY_OPTIONS : [...QUANTITY_OPTIONS, REMOVE];

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
      options={quantityOptions}
      className="w-12"
    />
  );
};

export default CartProductQuantity;
