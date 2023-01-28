import { shape, string } from 'prop-types';
import { useHistory } from 'react-router';

import { ROUTE } from 'common/const';
import { Button } from 'common/components';

const ViewDetails = ({ order }) => {
  // console.log('<View Details>');

  const history = useHistory();

  return (
    <Button
      text
      swap="caret-right"
      onClick={() =>
        history.push({
          pathname: `${ROUTE.ORDER_DETAILS}/${order.id}`,
          state: { scrollTo: window.scrollY },
        })
      }
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