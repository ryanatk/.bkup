import range from 'lodash/range';
import { MAX_QUANTITY, REMOVE } from '../../../consts/cart';
import { Select } from '../../sormus';

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

  const quantityOptions = [
    // if quantity is greater than max, use quantity
    // don't worry, the checkout button will be disabled
    ...range(quantity > MAX_QUANTITY ? quantity : MAX_QUANTITY).map((num) =>
      (num + 1).toString(),
    ),
    REMOVE,
  ];

  return (
    <Select
      name="ring-quantity"
      label="Quantity"
      hiddenLabel
      data-cy={`select-quantity-${handle}`}
      value={quantity}
      onChange={handleQuantityChange}
      options={quantityOptions}
      className="w-10"
    />
  );
};

export default CartProductQuantity;
