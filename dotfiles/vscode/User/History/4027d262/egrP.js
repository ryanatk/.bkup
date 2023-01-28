import { func, shape, string } from 'prop-types';
import { useHistory } from 'react-router';

import { useShop } from 'app/context';
import { Button } from 'common/components';
import { ROUTE } from 'common/const';

const ResumeOrder = ({ onClick = () => null, order, ...props }) => {
  const { reset: resetShop } = useShop() ?? {};
  const history = useHistory();
  const handleResume = (evt) => {
    resetShop({
      boothNumber: order.boothNumber,
      eventId: order.eventId,
      ooSummaryId: order.id,
    });
    onClick(evt);
    history.push(ROUTE.RESUME_ORDER);
  };

  return (
    <Button {...props} onClick={handleResume}>
      Resume Order
    </Button>
  );
};

ResumeOrder.propTypes = {
  onClick: func,
  order: shape({
    boothNumber: string.isRequired,
    eventId: string.isRequired,
    id: string.isRequired,
  }),
};

export default ResumeOrder;
