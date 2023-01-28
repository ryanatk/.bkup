import { useEffect, useState } from 'react';

const useHeaderHeight = () => {
  const [height, setHeight] = useState();

  const resizeHandler = () => {
    const width = this.divElement.getBoundingClientRect;
    const height = this.divElement.clientHeight;
    this.setState({ width, height });
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    return window.removeEventListener('resize', resizeHandler);
  });
};

export default useHeaderHeight;
