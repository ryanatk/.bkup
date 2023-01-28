import { ReactElement } from 'react';
import { CartLineItem as LineItem } from '../../../types/CartState';
import CartNoItemsMessage from './CartNoItemsMessage';
import CartProduct from './CartProduct';

interface Props {
  lineItems: Array<LineItem>;
}

interface Item extends LineItem {
  isParent: boolean;
}

const CartLineItems = ({ lineItems }: Props): ReactElement => {
  console.log('<CartLineItems>', { lineItems });

  if (!lineItems.length) return <CartNoItemsMessage />;

  const groupedItems = lineItems.reduce((obj, lineItem) => {
    const { id, parentId } = lineItem;
    const isParent = parentId === false || parentId === null;
    const item = { ...lineItem, isParent };

    return isParent
      ? { ...obj, [id]: [...(obj[id] ?? []), item] }
      : { ...obj, [parentId]: [...(obj[parentId] ?? []), item] };
  }, {});
  const groups = Object.values(groupedItems);

  return (
    <ul data-cy="cart-line-items">
      {Object.values(groups).map((items: Item[], i) =>
        items.map((item: Item) => (
          <li
            className={{
              'border-b border-sand-dark': i + 1 < groups.length,
            }}
            data-cy="cart-product-row"
            key={item.id + i + 'new' + item.parentId}
          >
            <CartProduct lineItem={item} isParent={item.isParent} />
          </li>
        )),
      )}
    </ul>
  );
};

export default CartLineItems;
