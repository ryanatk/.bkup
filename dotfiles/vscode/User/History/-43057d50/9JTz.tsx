import tw from 'twin.macro';
import { CartLineItem } from '../../../types/CartState';
import LineItemProduct from './LineItemProduct';

export interface LineItemProps {
  parent: CartLineItem;
  childItems: CartLineItem[];
  index: number;
}

const ChildList = tw.ol`
  md:(ml-40 mt-11)
  lg:(ml-72 mt-14)
`;

const ChildListItem = tw.li`
  my-8
  md:my-10
  last:mb-0
`;

const LineItem = ({
  parent,
  childItems,
  index,
}: LineItemProps): JSX.Element => {
  return (
    <div data-cy="cart-line-item" data-pid={parent.parentId}>
      <LineItemProduct isParent lineItem={parent} isFirst={index === 0} />
      {childItems.length ? (
        <ChildList>
          {childItems.map((child, i) => (
            <ChildListItem key={'line-item-child' + child.id + i}>
              <LineItemProduct lineItem={child} />
            </ChildListItem>
          ))}
        </ChildList>
      ) : null}
    </div>
  );
};

export default LineItem;
