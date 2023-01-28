import cx from 'classnames';
import sortBy from 'lodash/sortBy';
import { CartLineItem } from '../../../types/CartState';
import { isHardware } from '../../../utils/cartCount';
import CartNoItemsMessage from './CartNoItemsMessage';
import CartProduct from './CartProduct';

interface Props {
  lineItems: Array<CartLineItem>;
}

interface Item extends CartLineItem {
  isParent: boolean;
}

interface Asdf {
  parentId: string;
  items: Item[];
}

const CartLineItems = ({ lineItems }: Props): JSX.Element => {
  console.log('<CartLineItems>', { lineItems });

  if (!lineItems.length) return <CartNoItemsMessage />;

  const groupedItems = lineItems.reduce((obj, lineItem) => {
    const { parentId } = lineItem;
    const isParent = isHardware(lineItem);
    const item = { ...lineItem, isParent };

    return {
      ...obj,
      [parentId]: [...(obj[parentId] ?? []), item],
    };
  }, {});

  return (
    <ul data-cy="cart-line-items">
      {Object.entries(groupedItems).map(
        ([parentId, items], i, list): JSX.Element => (
          <li
            className={cx('py-6', {
              'border-b border-sand-dark': i + 1 < list.length,
            })}
            key={'cart-group' + parentId + i}
          >
            <ol>
              {(Array.isArray(items)
                ? sortBy(items, ({ isParent }) => !isParent)
                : []
              ).map((item: Item) => (
                <li
                  data-cy="cart-product-row"
                  key={'cart-product' + item.id + item.parentId}
                  className={cx('pb-3 md:pt-3', {
                    'md:ml-36': !item.isParent,
                  })}
                >
                  <CartProduct lineItem={item} isParent={item.isParent} />
                </li>
              ))}
            </ol>
          </li>
        ),
      )}
    </ul>
  );
};

export default CartLineItems;
