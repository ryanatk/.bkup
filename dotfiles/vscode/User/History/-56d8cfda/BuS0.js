import { shape, string } from 'prop-types';

import { ROUTE } from 'common/const';
import { Button } from 'common/components';

const ViewDetails = ({ order, scrollTo }) => {
  console.log('<View Details>');

  return (
    <Button
      text
      swap="caret-right"
      to={{
        pathname: `${ROUTE.ORDER_DETAILS}/${order.id}`,
        state: { scrollTo },
      }}
    >
      View Details
    </Button>
  );
};

ViewDetails.propTypes = {
  order: shape({
    id: string.isRequired,
  }),
};

export default ViewDetails;
