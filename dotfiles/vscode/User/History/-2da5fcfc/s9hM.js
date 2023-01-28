const TOP = 'top';
const position = {
  [TOP]: [0, 0],
};

const scroll = (to = TOP) => {
  const [x, y] = position;

  window.scroll(x, y);
};

export default scroll;
