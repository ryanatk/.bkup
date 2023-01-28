import { useRef, useEffect } from 'react';

const useThrottle = (fn, seconds = 10) => {
  const savedCallback = useRef();

  // Remember the latest fn.
  useEffect(() => {
    savedCallback.current = fn;
  }, [fn]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    const id = setInterval(tick, seconds * 1000);

    return () => clearInterval(id);
  }, [seconds]);

  // const id = createRef();
  // console.log(id.current)

  // useEffect(
  //   () => {
  //     // Update debounced value after delay
  //     id.current = setTimeout(() => {
  //       fn();
  //     }, delay);

  //     // Cancel the timeout if value changes (also on delay change or unmount)
  //     // This is how we prevent debounced value from updating if value is changed ...
  //     // .. within the delay period. Timeout gets cleared and restarted.
  //     return () => {
  //       clearTimeout(id.current);
  //     };
  //   },
  //   [fn, delay, id], // Only re-call effect if value or delay changes
  // );
};

export default useThrottle;
