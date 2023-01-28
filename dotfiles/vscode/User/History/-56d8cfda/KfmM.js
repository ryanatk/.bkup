import { shape, string } from 'prop-types';

import { ROUTE } from 'common/const';
import { Button } from 'common/components';

const ViewDetails = ({ order }) => (
  <Button text swap="caret-right" to={`${ROUTE.ORDER_DETAILS}/${order.id}`}>
    View Details
  </Button>
);

ViewDetails.propTypes = {
  order: shape({
    id: string.isRequired,
  }),
};

export default ViewDetails;
