import { useEffect, useState } from 'react';
import { HEADER_ID } from './Header/Header';

const useHeaderHeight = () => {
  const [height, setHeight] = useState();

  const resizeHandler = () => {
    const header = document.getElementById(HEADER_ID);
    const rect = header?.getBoundingClientRect();

    console.log({ rect });
    setHeight(rect?.height);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    return window.removeEventListener('resize', resizeHandler);
  });

  return height;
};

export default useHeaderHeight;
