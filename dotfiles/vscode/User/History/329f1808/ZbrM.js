import { useEffect, useState } from 'react';

const useHeaderHeight = () => {
  const [height, setHeight] = useState();

  useEffect(() => {
    window.addEventListener('resize', this.resizeHandler);

    return window.removeEventListener('resize', this.resizeHandler);
  });
};

export default useHeaderHeight;
