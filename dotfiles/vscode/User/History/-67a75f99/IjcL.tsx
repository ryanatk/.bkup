import { ReactElement } from 'react';
import { CartLineItem } from '../../../types/CartState';
import { Select } from '../../sormus';

const SIZING_KIT = 'sizing-kit';
const QUANTITY_OPTIONS = ['1', '2', '3', '4', '5'];
const REMOVE = 'Remove';

interface Props {
  lineItem: CartLineItem;
}

const CartProductQuantity = ({ lineItem }: Props): ReactElement => {
  const quantityOptions =
    lineItem.product?.handle === SIZING_KIT
      ? QUANTITY_OPTIONS
      : [...QUANTITY_OPTIONS, REMOVE];
  return (
    <Select
      name="ring-quantity"
      label="Quantity"
      hiddenLabel
      data-cy={`select-quantity-${lineItem.product?.handle}`}
      value={lineItem.quantity}
      onChange={() => null}
      options={quantityOptions}
      className="w-12"
    />
  );
};

export default CartProductQuantity;
