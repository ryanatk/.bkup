import { useOrders } from 'app/context';
import { useEffect, useState } from 'react';

const useResponseData = ({ ooSummaryId }) => {
  console.log('useResponseData', { ooSummaryId });

  const { findOrder, isFetching, refetchIncomplete, error } = useOrders();
  const [state, setState] = useState({
    responses: [],
    isLoading: false,
  });

  useEffect(() => {
    if (isFetching) {
      setState((data) => ({ ...data, isLoading: true }));
    }
  }, [isFetching]);

  useEffect(() => {
    const responses = findOrder(ooSummaryId)?.assessmentResponseData;

    if (responses) {
      setState({
        responses,
        isLoading: false,
      });
    } else if (!isFetching && ooSummaryId) {
      refetchIncomplete();
    }
  }, [findOrder, ooSummaryId, refetchIncomplete, isFetching]);

  return {
    responses: state.responses,
    isLoading: state.isLoading,
    refresh: refetchIncomplete,
    error,
  };
};

export default useResponseData;
