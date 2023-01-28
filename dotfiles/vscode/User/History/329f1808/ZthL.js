import { useEffect, useState } from 'react';
import { HEADER_ID } from './Header/Header';

const useHeaderHeight = () => {
  const [height, setHeight] = useState();

  console.log('useHeaderHeight');

  const resizeHandler = () => {
    console.log('resize');
    const header = document.getElementById(HEADER_ID);
    const rect = header?.getBoundingClientRect();

    console.log({ rect });
    setHeight(rect?.height);
  };

  useEffect(() => {
    console.log('add listener');
    window.addEventListener('resize', resizeHandler);

    return window.removeEventListener('resize', resizeHandler);
  }, []);

  return height;
};

export default useHeaderHeight;
