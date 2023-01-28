import cx from 'classnames';
import { Select } from '../../sormus';

const REMOVE = 'Remove';
const QUANTITY_OPTIONS = ['1', '2', '3', '4', '5', REMOVE];

interface Props {
  handle: string;
  onQuantityChange: (qty: number) => void;
  quantity: number;
  className?: string;
}

const CartProductQuantity = ({
  handle,
  onQuantityChange,
  quantity,
  className,
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
      className={cx('w-12', className)}
    />
  );
};

export default CartProductQuantity;
