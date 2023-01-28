import tw from 'twin.macro';
import { useCartState } from './hooks/useCartState';
import LineItem from './LineItem';

const ListItem = tw.li`
  border-b
  border-b-grayscale
  mb-4
  pb-4
  lg:(
    mb-14
    pb-14
  )
  last:(
    border-b-0
    mb-0
    pb-0
  )
`;

const LineItems = (): JSX.Element => {
  const { lineItemsByParentId } = useCartState();
  console.log({ lineItemsByParentId });

  return (
    <ol data-cy="cart-line-items">
      {Object.entries(lineItemsByParentId).map(([parentId, lineItem]) => (
        <ListItem data-cy="cart-product-row" key={`cart-line-${parentId}`}>
          <LineItem {...lineItem} />
        </ListItem>
      ))}
    </ol>
  );
};

export default LineItems;
