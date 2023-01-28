const TOP = 'top';
const position = {
  [TOP]: [0, 0],
};

const scroll = (to = TOP) => {
  const coords = position[to];
  const [x, y] = coords ? coords : to;

  window.scroll(x, y);
};

export default scroll;
