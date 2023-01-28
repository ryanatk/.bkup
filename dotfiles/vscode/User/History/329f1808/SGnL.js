import { useCallback, useEffect, useState } from 'react';

import { HEADER_ID } from './Header/Header';

const useHeaderHeight = () => {
  const [height, setHeight] = useState();

  const resizeHandler = useCallback(() => {
    const header = document.getElementById(HEADER_ID);
    const rect = header?.getBoundingClientRect();

    if (rect && height !== rect?.height) {
      setHeight(rect?.height);
    }
  }, [height]);

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    // and run once on mount
    resizeHandler();

    return () => window.removeEventListener('resize', resizeHandler);
  }, [resizeHandler]);

  return height;
};

export default useHeaderHeight;
