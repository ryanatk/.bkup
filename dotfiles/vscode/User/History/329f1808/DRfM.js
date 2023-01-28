import { useEffect, useState } from 'react';

import { HEADER_ID } from './Header/Header';

const useHeaderHeight = () => {
  const [height, setHeight] = useState();
  console.log({ height });

  const resizeHandler = () => {
    const header = document.getElementById(HEADER_ID);
    const rect = header?.getBoundingClientRect();

    if (rect && height !== rect?.height) {
      setHeight(rect?.height);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  });

  return height;
};

export default useHeaderHeight;
