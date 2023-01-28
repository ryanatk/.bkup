import { useEffect, useMemo } from 'react';

import { useOrders } from 'app/context';

const useResponseData = ({ ooSummaryId }) => {
  // console.log('!useResponseData', { ooSummaryId });

  const { findOrder, isFetching, refetchIncomplete, error } = useOrders();

  const responses = useMemo(
    () => findOrder(ooSummaryId)?.assessmentResponseData,
    [findOrder, ooSummaryId],
  );

  useEffect(() => {
    if (!responses) {
      refetchIncomplete();
    }
  }, [responses, refetchIncomplete, isFetching]);

  return {
    responses,
    isFetching,
    refetch: refetchIncomplete,
    error,
  };
};

export default useResponseData;
