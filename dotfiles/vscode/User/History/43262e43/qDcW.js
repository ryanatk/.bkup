import { useEffect, useRef } from 'react';

function useSetInterval(callback, seconds = 5) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    const id = setInterval(tick, seconds * 1000);

    return () => clearInterval(id);
  }, [seconds]);
}

export default useSetInterval;
