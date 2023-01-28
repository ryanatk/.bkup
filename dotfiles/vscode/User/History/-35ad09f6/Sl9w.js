import { Redirect } from 'react-router';

import { Content, Require } from 'common/components';
import { useShop } from 'app/context';

import useEnterOrder from '../useEnterOrder';

const ResumeOrder = () => {
  const { eventId, ooSummaryId } = useShop();
  const { entry, error } = useEnterOrder({ eventId, ooSummaryId });

  console.log('<ResumeOrder>', { eventId, ooSummaryId, entry });

  return (
    <Require shop>
      {entry ? (
        <Redirect to={entry} />
      ) : (
        <Content error={error?.message} isLoading={!error} />
      )}
    </Require>
  );
};

export default ResumeOrder;
