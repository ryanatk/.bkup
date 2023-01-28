import { createRef, useEffect } from 'react';

const useThrottle = (fn, delay = 500) => {
  const id = createRef();

  useEffect(
    () => {
      // Update debounced value after delay
      id.current = setTimeout(() => {
        fn();
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(id.current);
      };
    },
    [fn, delay, id], // Only re-call effect if value or delay changes
  );
};

export default useThrottle;
